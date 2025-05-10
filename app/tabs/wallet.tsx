import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Typo from "@/components/Typo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/types";
import { orderBy, where } from "firebase/firestore";
import { useAuth } from "@/contexts/authContext";
import Loading from "@/components/Loading";
import WalletListItem from "@/components/WalletListItem";
import { ThemeContext } from "@/contexts/themeContext";

const Wallet = () => {
  const { currentTheme } = useContext(ThemeContext);
  const router = useRouter();
  const { user } = useAuth();

  // Получаем список кошельков текущего пользователя, отсортированный по дате создания
  const {
    data: wallets,
    error,
    loading,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  // console.log('wallets: ', wallets.length);

  // Вычисляем общий баланс по всем кошелькам
  const getTotalBalance = () =>
    wallets.reduce((total, item) => {
      total = total + (item.amount || 0);
      return total;
    }, 0);

  return (
    <ScreenWrapper
      style={{
        backgroundColor:
          currentTheme === "dark" ? colors.black : colors.neutralBlue,
      }}
    >
      <View style={styles.container}>
        {/* Секция отображения общего баланса */}
        <View
          style={[
            styles.balanceView,
            {
              backgroundColor:
                currentTheme === "dark" ? colors.black : colors.neutralBlue,
            },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <Typo size={43} fontWeight={"medium"}>
              ₽{getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo
              size={16}
              fontWeight={"medium"}
              color={
                currentTheme === "dark" ? colors.neutral300 : colors.neutral500
              }
            >
              Общий баланс
            </Typo>
          </View>
        </View>
        {/* Секция списка кошельков */}
        <View
          style={[
            styles.wallets,
            {
              backgroundColor:
                currentTheme === "dark"
                  ? colors.neutral900
                  : colors.bgScreenLight,
            },
            {
              borderColor:
                currentTheme === "dark" ? colors.neutral700 : colors.neutral400,
            },
          ]}
        >
          {/* Заголовок и кнопка добавления нового кошелька */}
          <View style={styles.flexRow}>
            <Typo size={18} fontWeight={"medium"}>
              Мои кошельки
            </Typo>
            <TouchableOpacity
              onPress={() => router.push("/modals/walletModal")}
            >
              <MaterialCommunityIcons
                name="plus-circle"
                size={verticalScale(33)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          {loading && <Loading />}
          {/* Список кошельков */}
          <FlatList
            data={wallets}
            renderItem={({ item, index }) => {
              return (
                <WalletListItem item={item} index={index} router={router} />
              );
            }}
            contentContainerStyle={styles.listStyle}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  wallets: {
    flex: 1,
    // backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
    // borderColor: colors.neutral400,
    borderWidth: 0.4,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
