import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useContext } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { ModalWrapperProps } from "@/types";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/contexts/themeContext";

const isIos = Platform.OS == "ios";

const ModalWrapper = ({ style, children, bg }: ModalWrapperProps) => {
  const { currentTheme } = useContext(ThemeContext);

  const backgroundColor =
    bg || (currentTheme === "dark" ? colors.neutral800 : colors.bgModalLight);

  return (
    <View style={[styles.container, { backgroundColor }, style && style]}>
      <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
      {children}
    </View>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {
    paddingTop: isIos ? spacingX._15 : 50,
    paddingBottom: isIos ? spacingY._20 : spacingY._10,
    flex: 1,
  },
});
