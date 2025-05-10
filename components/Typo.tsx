import { StyleSheet, Text, TextStyle, View } from "react-native";
import React, { useContext } from "react";
import { verticalScale } from "@/utils/styling";
import { colors } from "@/constants/theme";
import { TypoProps } from "@/types";
import { useFonts } from "expo-font";
import { ThemeContext } from "@/contexts/themeContext";

// Компонент Typo для стилизации текста с настраиваемыми параметрами
const Typo = ({
  size,
  color,
  fontWeight,
  fontFamily,
  children,
  style,
  textProps = {},
}: TypoProps) => {
  const { currentTheme } = useContext(ThemeContext);

  const textColor =
    currentTheme === "dark" ? colors.textLight : colors.textDark;

  const finalColor = color || textColor;

  const [fontsLoaded] = useFonts({
    GothamPro: require("../assets/fonts/gothampro.ttf"),
    "GothamPro-Medium": require("../assets/fonts/gothampro_medium.ttf"),
    "GothamPro-Bold": require("../assets/fonts/gothampro_bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  let selectedFont = fontFamily || "GothamPro";

  if (!fontFamily) {
    if (fontWeight === "400" || fontWeight === "normal") {
      selectedFont = "GothamPro";
    } else if (fontWeight === "500" || fontWeight === "medium") {
      selectedFont = "GothamPro-Medium";
    } else if (fontWeight === "700" || fontWeight === "bold") {
      selectedFont = "GothamPro-Bold";
    }
  }

  // Определение стилей текста на основе переданных пропсов
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color: finalColor,
    fontFamily: selectedFont,
  };

  return (
    // Рендеринг текста с применением рассчитанных стилей и дополнительных пропсов
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({});
