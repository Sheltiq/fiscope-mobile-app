import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext } from "react";
import { InputProps } from "@/types";
import { colors, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { ThemeContext } from "@/contexts/themeContext";

const Input = (props: InputProps) => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    // Основной контейнер для компонента Input
    <View
      style={[
        styles.container,
        props.containerStyle && props.containerStyle,
        {
          borderColor:
            currentTheme === "dark" ? colors.neutral300 : colors.neutral400,
        },
      ]}
    >
      {/* Отображение иконки, если она передана через props */}
      {props.icon && props.icon}
      {/* Поле ввода текста с передачей всех дополнительных свойств через props */}
      <TextInput
        style={[
          styles.input,
          props.inputStyle,
          {
            color: currentTheme === "dark" ? colors.textLight : colors.textDark,
          },
        ]}
        placeholderTextColor={
          currentTheme === "dark" ? colors.neutral500 : colors.neutral400
        }
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    // borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: verticalScale(14),
  },
});
