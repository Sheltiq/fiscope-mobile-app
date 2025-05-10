import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ScreenWrapperProps } from "@/types";
import { colors } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/contexts/themeContext";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const { currentTheme } = useContext(ThemeContext);
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 50;
  return (
    <View
      style={[
        {
          paddingTop,
          flex: 1,
          backgroundColor:
            currentTheme === "dark" ? colors.neutral900 : colors.bgScreenLight,
        },
        style,
      ]}
    >
      <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
      {children}
    </View>
  );
};

export default ScreenWrapper;
