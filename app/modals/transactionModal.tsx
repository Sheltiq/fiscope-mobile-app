import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { TransactionType, UserDataType, WalletType } from "@/types";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "@/components/ImageUpload";
import { createOrUpdateWallet, deleteWallet } from "@/services/walletService";
import { Dropdown } from "react-native-element-dropdown";
import { expenseCategories, transactionTypes } from "@/constants/data";
import useFetchData from "@/hooks/useFetchData";
import { orderBy, where } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  createOrUpdateTransaction,
  deleteTransaction,
} from "@/services/transactionService";
import { ThemeContext } from "@/contexts/themeContext";

const TransactionModal = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { user } = useAuth();

  const [transaction, setTransaction] = useState<TransactionType>({
    type: "expense",
    amount: 0,
    description: "",
    category: "",
    date: new Date(),
    walletId: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const {
    data: wallets,
    error: walletError,
    loading: walletLoading,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  type paramType = {
    id: string;
    type: string;
    amount: string;
    category?: string;
    date: string;
    description?: string;
    image?: any;
    uid?: string;
    walletId: string;
  };

  const oldTransaction: paramType = useLocalSearchParams();

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || transaction.date;
    setTransaction({ ...transaction, date: currentDate });
    setShowDatePicker(Platform.OS == "ios" ? true : false);
  };

  useEffect(() => {
    if (oldTransaction?.id) {
      setTransaction({
        type: oldTransaction?.type,
        amount: Number(oldTransaction.amount),
        description: oldTransaction.description || "",
        category: oldTransaction.category || "",
        date: new Date(oldTransaction.date),
        walletId: oldTransaction.walletId,
        image: oldTransaction?.image,
      });
    }
  }, []);

  const onSubmit = async () => {
    const { type, amount, description, category, date, walletId, image } =
      transaction;

    if (!walletId || !date || !amount || (type == "expense" && !category)) {
      Alert.alert("Транзакция", "Пожалуйста заполните все поля");
      return;
    }

    // console.log("готово");
    let transactionData: TransactionType = {
      type,
      amount,
      description,
      category,
      date,
      walletId,
      image: image ? image : null,
      uid: user?.uid,
    };

    // console.log("Информация о транзакции: ", transactionData);

    if (oldTransaction?.id) transactionData.id = oldTransaction.id;
    setLoading(true);
    const res = await createOrUpdateTransaction(transactionData);

    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Транзакция", res.msg);
    }
  };

  const onDelete = async () => {
    if (!oldTransaction?.id) return;
    setLoading(true);
    const res = await deleteTransaction(
      oldTransaction?.id,
      oldTransaction.walletId
    );
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Транзакция", res.msg);
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Подтвердить",
      "Вы уверены, что хотите удалить эту транзакцию?",
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
          title={
            oldTransaction?.id ? "Обновить транзакцию" : "Новая транзакция"
          }
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          {/* категории расходов */}
          <View style={styles.inputContainer}>
            <Typo
              color={
                currentTheme === "dark" ? colors.neutral200 : colors.neutral500
              }
              size={16}
              fontWeight={"medium"}
            >
              Тип
            </Typo>
            <Dropdown
              style={[
                styles.dropdownContainer,
                {
                  borderColor:
                    currentTheme === "dark"
                      ? colors.neutral300
                      : colors.neutral400,
                },
              ]}
              activeColor={colors.neutral700}
              // placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={[
                styles.dropdownSelectedText,
                {
                  color: currentTheme === "dark" ? colors.white : colors.black,
                },
              ]}
              iconStyle={styles.dropdownIcon}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              // placeholder={!isFocus ? "Выбрать элемент" : "..."}
              // searchPlaceholder="Поиск..."
              value={transaction.type}
              onChange={(item) => {
                setTransaction({ ...transaction, type: item.value });
              }}
            />
          </View>

          {/* кошельки */}
          <View style={styles.inputContainer}>
            <Typo
              color={
                currentTheme === "dark" ? colors.neutral200 : colors.neutral500
              }
              size={16}
              fontWeight={"medium"}
            >
              Кошелек
            </Typo>
            <Dropdown
              style={[
                styles.dropdownContainer,
                {
                  borderColor:
                    currentTheme === "dark"
                      ? colors.neutral300
                      : colors.neutral400,
                },
              ]}
              activeColor={colors.neutral700}
              placeholderStyle={[
                styles.dropdownPlaceholder,
                {
                  color: currentTheme === "dark" ? colors.white : colors.black,
                },
              ]}
              selectedTextStyle={[
                styles.dropdownSelectedText,
                {
                  color: currentTheme === "dark" ? colors.white : colors.black,
                },
              ]}
              iconStyle={styles.dropdownIcon}
              data={wallets.map((wallet) => ({
                label: `${wallet?.name} (₽${wallet.amount})`,
                value: wallet?.id,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={"Выберите кошелек"}
              value={transaction.walletId}
              onChange={(item) => {
                setTransaction({ ...transaction, walletId: item.value || "" });
              }}
            />
          </View>

          {/* категории расходов */}
          {transaction.type == "expense" && (
            <View style={styles.inputContainer}>
              <Typo
                color={
                  currentTheme === "dark"
                    ? colors.neutral200
                    : colors.neutral500
                }
                size={16}
                fontWeight={"medium"}
              >
                Категория
              </Typo>
              <Dropdown
                style={[
                  styles.dropdownContainer,
                  {
                    borderColor:
                      currentTheme === "dark"
                        ? colors.neutral300
                        : colors.neutral400,
                  },
                ]}
                activeColor={colors.neutral700}
                placeholderStyle={[
                  styles.dropdownPlaceholder,
                  {
                    color:
                      currentTheme === "dark" ? colors.white : colors.black,
                  },
                ]}
                selectedTextStyle={[
                  styles.dropdownSelectedText,
                  {
                    color:
                      currentTheme === "dark" ? colors.white : colors.black,
                  },
                ]}
                iconStyle={styles.dropdownIcon}
                data={Object.values(expenseCategories)}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                placeholder={"Выберите категорию"}
                value={transaction.category}
                onChange={(item) => {
                  setTransaction({
                    ...transaction,
                    category: item.value || "",
                  });
                }}
              />
            </View>
          )}

          {/* выбор даты */}

          <View style={styles.inputContainer}>
            <Typo
              color={
                currentTheme === "dark" ? colors.neutral200 : colors.neutral500
              }
              size={16}
              fontWeight={"medium"}
            >
              Дата
            </Typo>
            {!showDatePicker && (
              <Pressable
                style={[
                  styles.dateInput,
                  {
                    borderColor:
                      currentTheme === "dark"
                        ? colors.neutral300
                        : colors.neutral400,
                  },
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Typo size={14}>
                  {(transaction.date as Date).toLocaleDateString()}
                </Typo>
              </Pressable>
            )}

            {showDatePicker && (
              <View style={Platform.OS == "ios" && styles.iosDatePicker}>
                <DateTimePicker
                  themeVariant="dark"
                  value={transaction.date as Date}
                  textColor={colors.white}
                  mode="date"
                  display={Platform.OS == "ios" ? "spinner" : "calendar"}
                  onChange={onDateChange}
                />

                {Platform.OS == "ios" && (
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Typo size={15} fontWeight={"medium"}>
                      Ок
                    </Typo>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Typo
              color={
                currentTheme === "dark" ? colors.neutral200 : colors.neutral500
              }
              size={16}
              fontWeight={"medium"}
            >
              Сумма
            </Typo>
            <Input
              // placeholder="Заначка"
              value={transaction.amount?.toString()}
              onChangeText={(value) =>
                setTransaction({
                  ...transaction,
                  amount: Number(value.replace(/[^0-9]/g, "")),
                })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo
                color={
                  currentTheme === "dark"
                    ? colors.neutral200
                    : colors.neutral500
                }
                size={16}
                fontWeight={"medium"}
              >
                Описание
              </Typo>
              <Typo
                color={
                  currentTheme === "dark"
                    ? colors.neutral500
                    : colors.neutral400
                }
                size={14}
              >
                (необязательно)
              </Typo>
            </View>

            <Input
              // placeholder="Заначка"
              value={transaction.description}
              multiline
              containerStyle={{
                flexDirection: "row",
                height: verticalScale(100),
                alignItems: "flex-start",
                paddingVertical: 15,
              }}
              onChangeText={(value) =>
                setTransaction({
                  ...transaction,
                  description: value,
                })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo
                color={
                  currentTheme === "dark"
                    ? colors.neutral200
                    : colors.neutral500
                }
                size={16}
                fontWeight={"medium"}
              >
                Квитанция
              </Typo>
              <Typo
                color={
                  currentTheme === "dark"
                    ? colors.neutral500
                    : colors.neutral400
                }
                size={14}
              >
                (необязательно)
              </Typo>
            </View>
            <ImageUpload
              file={transaction.image}
              onClear={() => setTransaction({ ...transaction, image: null })}
              onSelect={(file) =>
                setTransaction({ ...transaction, image: file })
              }
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
        {oldTransaction?.id && !loading && (
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
            {oldTransaction?.id ? "Обновить" : "Отправить"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },
  form: {
    gap: spacingY._20,
    paddingVertical: spacingY._15,
    paddingBottom: spacingY._40,
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
  inputContainer: {
    gap: spacingY._10,
  },
  androidDropDown: {
    // flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    fontSize: verticalScale(14),
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    // paddingHorizontal: spacingX._15,
  },
  iosDropDown: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    fontSize: verticalScale(14),
    borderWidth: 1,
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
  },
  dateInput: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    borderWidth: 1,
    // borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  iosDatePicker: {
    // backgroundColor: "red",
  },
  datePickerButton: {
    backgroundColor: colors.neutral700,
    alignSelf: "flex-end",
    padding: spacingY._7,
    marginRight: spacingX._7,
    paddingHorizontal: spacingY._15,
    borderRadius: radius._10,
  },
  dropdownContainer: {
    height: verticalScale(54),
    borderWidth: 1,
    // borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  dropdownItemText: { color: colors.white },
  dropdownSelectedText: {
    // color: colors.black,
    fontSize: verticalScale(14),
  },
  dropdownListContainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  dropdownPlaceholder: {
    // color: colors.white,
  },
  dropdownItemContainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },
  dropdownIcon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
});
