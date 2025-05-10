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
import { UserDataType, WalletType } from "@/types";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "@/components/ImageUpload";
import { createOrUpdateWallet, deleteWallet } from "@/services/walletService";
import { ThemeContext } from "@/contexts/themeContext";

//Модальное окно для создания/редактирования кошелька
const WalletModal = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { user, updateUserData } = useAuth();
  // Локальное состояние для данных кошелька
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  });
  // Состояние загрузки для отображения индикатора
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Получение параметров существующего кошелька, если это редактирование
  const oldWallet: { name: string; image: string; id: string } =
    useLocalSearchParams();

  // При монтировании компонента заполняем форму данными если это редактирование
  useEffect(() => {
    if (oldWallet?.id) {
      setWallet({
        name: oldWallet?.name,
        image: oldWallet?.image,
      });
    }
  }, []);

  // Обработка создания/обновления кошелька
  const onSubmit = async () => {
    // Валидация обязательных полей
    let { name, image } = wallet;
    if (!name.trim() || !image) {
      Alert.alert("Кошелек", "Пожалуйста заполните все поля");
      return;
    }
    // Формируем данные для сохранения
    const data: WalletType = {
      name,
      image,
      uid: user?.uid,
    };
    // Добавляем id если это обновление существующего кошелька
    if (oldWallet?.id) data.id = oldWallet?.id;

    // Отправляем запрос на сервер
    setLoading(true);
    const res = await createOrUpdateWallet(data);
    setLoading(false);
    // console.log('результат: ', res);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Кошелек", res.msg);
    }
  };

  // Обработка удаления кошелька
  const onDelete = async () => {
    if (!oldWallet?.id) return;
    setLoading(true);
    const res = await deleteWallet(oldWallet?.id);
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Кошелек", res.msg);
    }
  };
  //Показывает диалог подтверждения удаления
  const showDeleteAlert = () => {
    Alert.alert(
      "Подтвердить",
      "Вы уверены, что хотите удалить? \nЭто действие приведет к удалению всех транзакций связанных с этим кошельком",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => onDelete(),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? "Обновить кошелек" : "Новый кошелек"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo
              color={
                currentTheme === "dark" ? colors.neutral200 : colors.neutral500
              }
              fontWeight={"medium"}
            >
              Название кошелька
            </Typo>
            <Input
              placeholder="Введите название"
              value={wallet.name}
              onChangeText={(value) => setWallet({ ...wallet, name: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo
              color={
                currentTheme === "dark" ? colors.neutral200 : colors.neutral500
              }
              fontWeight={"medium"}
            >
              Изображение
            </Typo>
            <ImageUpload
              file={wallet.image}
              onClear={() => setWallet({ ...wallet, image: null })}
              onSelect={(file) => setWallet({ ...wallet, image: file })}
              placeholder="Загрузить изображение"
            />
          </View>
        </ScrollView>
      </View>

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
        {oldWallet?.id && !loading && (
          <Button
            onPress={showDeleteAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <MaterialCommunityIcons
              name="delete-forever"
              size={verticalScale(28)}
              color={colors.white}
            />
          </Button>
        )}
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo fontWeight={"medium"} size={18} color="white">
            {oldWallet?.id ? "Обновить" : "Добавить"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

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
