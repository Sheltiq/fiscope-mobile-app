import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

// Создаем контекст для аутентификации
const AuthContext = createContext<AuthContextType | null>(null);

// Провайдер контекста аутентификации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Состояние для хранения данных пользователя
  const [user, setUser] = useState<UserType>(null);

  // Эффект для отслеживания изменений состояния аутентификации
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {

      // Если пользователь аутентифицирован, обновляем данные пользователя и перенаправляем на вкладки
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          email: firebaseUser?.email,
          name: firebaseUser?.displayName
        });
        updateUserData(firebaseUser.uid);
        router.replace("/tabs");
      } else {
        // Если пользователь не аутентифицирован, сбрасываем данные пользователя и перенаправляем на экран приветствия
        setUser(null);
        router.replace("/auth/welcome");
      }
    });
    return () => unsub(); // Отписываемся от слушателя при размонтировании
  }, []);

  // Функция для входа пользователя
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error message: ", msg);
      // Обработка ошибок аутентификации
      if (msg.includes("(auth/network-requast-failed)")) msg = "Нет подключения к сети";
      if (msg.includes("(auth/invalid-credential)")) msg = "Неправильные данные";
      if (msg.includes("(auth/invalid-email)")) msg = "Недопустимый адрес электронной почты";
      return { success: false, msg };
    }
  };

  // Функция для регистрации нового пользователя
  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);
      // Сохраняем данные пользователя в Firestore
      await setDoc(doc(firestore, "users", response?.user?.uid), { name, email, uid: response?.user?.uid, });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error massage", msg);
      // Обработка ошибок регистрации
      if (msg.includes("(auth/network-requast-failed)")) msg = "Нет подключения к сети";
      if (msg.includes("(auth/email-already-in-use)")) msg = "Этот адрес электронной почты уже используется";
      if (msg.includes("(auth/invalid-email)")) msg = "Недопустимый адрес электронной почты";
      return { success: false, msg };
    }
  };

  // Функция для обновления данных пользователя из Firestore
  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;

      console.log("error: ", error);
    }
  };

  // Значение контекста, которое будет доступно в дочерних компонентах
  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    // Предоставляем контекст аутентификации дочерним компонентам
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth должен быть обернут внутри AuthProvider");
  }
  return context;
};