import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Typo from "./Typo";
import { WalletType } from "@/types";
import { Router } from "expo-router";
import { verticalScale } from "@/utils/styling";
import { colors, radius, spacingX } from "@/constants/theme";
import { Image } from "expo-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ThemeContext } from "@/contexts/themeContext";

// Компонент для отображения отдельного кошелька в списке
const WalletListItem = ({
  item,
  index,
  router,
}: {
  item: WalletType;
  index: number;
  router: Router;
}) => {
  const { currentTheme } = useContext(ThemeContext);
  // Открытие модального окна для редактирования кошелька
  const openWallet = () => {
    router.push({
      pathname: "/modals/walletModal",
      params: {
        id: item?.id,
        name: item?.name,
        image: item?.image,
      },
    });
  };

  return (
    // Анимированное появление элемента с задержкой
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .springify()
        .damping(13)}
    >
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        {/* Изображение кошелька */}
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1 }}
            source={item?.image}
            contentFit="cover"
            transition={100}
          />
        </View>
        {/* Информация о кошельке */}
        <View style={styles.nameContainer}>
          <Typo size={16}>{item?.name}</Typo>
          <Typo
            size={14}
            color={
              currentTheme === "dark" ? colors.neutral400 : colors.neutral500
            }
          >
            ₽{item?.amount}
          </Typo>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={verticalScale(30)}
          color={currentTheme === "dark" ? colors.white : colors.black}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WalletListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
    // padding: spacingX._15,
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  },
});
