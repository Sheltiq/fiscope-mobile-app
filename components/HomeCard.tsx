import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { scale, verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeCard = () => {
  return (
    <ImageBackground
      source={require("../assets/images/card.png")}
      resizeMode="stretch"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.totalBalanceRow}>
            <Typo color={colors.neutral800} size={17} fontWeight={"medium"}>
              Общий баланс
            </Typo>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={verticalScale(25)}
              color={colors.black}
            />
          </View>
          <Typo color={colors.black} size={30} fontWeight={"bold"}>
            ₽5000.55
          </Typo>
        </View>

        <View style={styles.stats}>
          {/* Доходы*/}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Ionicons
                  name="arrow-down"
                  size={verticalScale(15)}
                  color={colors.black}
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"medium"}>
                Доход
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.green} fontWeight={"medium"}>
                ₽ 5000
              </Typo>
            </View>
          </View>

          {/* Расходы */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Ionicons
                  name="arrow-up"
                  size={verticalScale(15)}
                  color={colors.black}
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"medium"}>
                Расход
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.rose} fontWeight={"medium"}>
                ₽ 1337
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  bgImage: {
    height: scale(210),
    width: "100%",
  },
  container: {
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "87%",
    width: "100%",
    justifyContent: "space-between",
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },
});
