import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { verticalScale } from "@/utils/styling";
import { colors } from "@/constants/theme";
import { TypoProps } from "@/types";
import { useFonts } from "expo-font";

// Компонент Typo для стилизации текста с настраиваемыми параметрами
const Typo = ({
  size,
  color = colors.text,
  fontWeight = "400",
  fontFamily = "GothamPro", 
  children,
  style,
  textProps = {},
}: TypoProps) => {

  const [fontsLoaded] = useFonts({
    "GothamPro": require("../assets/fonts/gothampro.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }

  // Определение стилей текста на основе переданных пропсов
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
    fontFamily,
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