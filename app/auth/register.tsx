import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import * as Icons from 'phosphor-react-native';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/authContext';

const Register = () => {

  // Создаем ссылки для хранения значений полей ввода
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const router = useRouter(); // Хук для навигации
  const { register: registerUser } = useAuth(); // Получаем функцию регистрации из контекста

  // Обработчик отправки формы
  const handleSubmit = async () => {
    // Проверяем, заполнены ли все поля
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert('Зарегистрироваться', "Пожалуйста заполните все поля");
      return;
    }
    setIsLoading(true); // Устанавливаем состояние загрузки
    const res = await registerUser(emailRef.current, passwordRef.current, nameRef.current); // Вызываем функцию регистрации
    setIsLoading(false); // Сбрасываем состояние загрузки
    console.log("Результат регистрации:", res);
    if (!res.success) {
      Alert.alert("Регистрация", res.msg); // Показываем сообщение об ошибке, если регистрация не удалась
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Кнопка для возврата назад */}
        <BackButton iconSize={28} />

        {/* Приветственный текст */}
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Рады видеть тебя!
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Следи за расходами с нами!
          </Typo>
        </View>

        {/* Форма регистрации */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Создай аккаунт для учета расходов
          </Typo>
          <Input
            placeholder="Введите свое имя"
            onChangeText={(value) => (nameRef.current = value)} // Сохраняем значение имени
            icon={
              <Icons.User
                size={verticalScale(22)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Введите адрес электронной почты"
            onChangeText={(value) => (emailRef.current = value)} // Сохраняем значение email
            icon={
              <Icons.SignIn
                size={verticalScale(22)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Введите пароль"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)} // Сохраняем значение пароля
            icon={
              <Icons.Password
                size={verticalScale(22)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          {/* Кнопка для отправки формы */}
          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.white} size={20}>
              Зарегистрироваться
            </Typo>
          </Button>
        </View>

        {/* Нижний текст с ссылкой на вход */}
        <View style={styles.footer}>
          <Typo size={15}>У вас уже есть аккаунт?</Typo>
          <Pressable onPress={() => router.replace("/auth/login")}> {/* Переход на экран входа */}
            <Typo size={15} fontWeight={'700'} color={colors.primary}>
              Войти
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

// Стили для экрана регистрации
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});