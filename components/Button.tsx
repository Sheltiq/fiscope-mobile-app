import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { CustomButtonProps } from "@/types";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Loading from "@/components/Loading";


const Button = ({
  style,
  onPress,
  loading = false,
  children,
}: CustomButtonProps) => {
  // Если кнопка в состоянии загрузки, отображаем индикатор загрузки
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
        <Loading />
      </View>
    );
  }
  // Отображаем кнопку с переданными пропсами и содержимым
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button

// Определяем стили для кнопки
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});