import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { verticalScale } from "@/utils/styling";
import { colors } from "@/constants/theme";
import { TypoProps } from "@/types";

// Компонент Typo для стилизации текста с настраиваемыми параметрами
const Typo = ({
  size,
  color = colors.text,
  fontWeight = "400",
  children,
  style,
  textProps = {},
}: TypoProps) => {
// Определение стилей текста на основе переданных пропсов
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
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