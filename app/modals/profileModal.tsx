import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { UserDataType } from "@/types";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ThemeContext } from "@/contexts/themeContext";

// Модальное окно для редактирования профиля пользователя
const ProfileModal = () => {
  const { currentTheme } = useContext(ThemeContext);

  // Получаем данные пользователя и функцию обновления из контекста авторизации
  const { user, updateUserData } = useAuth();

  // Локальное состояние для хранения данных пользователя (имя и изображение)
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });

  // Состояние для отображения загрузки
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // При изменении данных пользователя обновляем локальное состояние
  useEffect(() => {
    setUserData({
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);

  // Функция для выбора изображения из галереи
  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUserData({ ...userData, image: result.assets[0] });
    }
  };

  // Функция отправки обновленных данных на сервер
  const onSubmit = async () => {
    let { name, image } = userData;
    if (!name.trim()) {
      Alert.alert("Пользователь", "Пожалуйста заполните все поля");
      return;
    }

    setLoading(true);
    const res = await updateUser(user?.uid as string, userData);
    setLoading(false);
    if (res.success) {
      updateUserData(user?.uid as string);
      router.back();
    } else {
      Alert.alert("Пользователь", res.msg);
    }
  };

  return (
    <ModalWrapper>
      {/* Контейнер модального окна */}
      <View style={styles.container}>
        {/* Заголовок с кнопкой возврата */}
        <Header
          title="Редактировать профиль"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* Форма редактирования профиля */}
        <ScrollView contentContainerStyle={styles.form}>
          {/* Контейнер для аватара с возможностью редактирования */}
          <View style={styles.avatarContainer}>
            <Image
              source={getProfileImage(userData.image)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />

            {/* Кнопка редактирования аватара */}
            <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
              <MaterialCommunityIcons
                name="pencil"
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </TouchableOpacity>
          </View>

          {/* Поле ввода имени пользователя */}
          <View style={styles.inputContainer}>
            <Typo
              color={
                currentTheme === "dark" ? colors.textLight : colors.textDark
              }
            >
              Имя
            </Typo>
            <Input
              placeholder="Имя"
              value={userData.name}
              onChangeText={(value) =>
                setUserData({ ...userData, name: value })
              }
            />
          </View>
        </ScrollView>
      </View>

      {/* Футер с кнопкой обновления */}
      <View
        style={[
          styles.footer,
          {
            borderTopColor:
              currentTheme === "dark"
                ? colors.neutral700
                : colors.borderColorFooterLight,
          },
        ]}
      >
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.white} fontWeight={"medium"} size={18}>
            Обновить
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
    // paddingVertical: spacingY._30,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    // borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
