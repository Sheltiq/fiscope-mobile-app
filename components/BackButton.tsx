import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { BackButtonProps } from "@/types";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { verticalScale } from "@/utils/styling";
import { colors, radius } from "@/constants/theme";
import { ThemeContext } from "@/contexts/themeContext";

const BackButton = ({ style, iconSize = 26 }: BackButtonProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[
        styles.button,
        style,
        {
          backgroundColor:
            currentTheme === "dark" ? colors.neutral600 : colors.btnLight,
        },
      ]}
    >
      <MaterialCommunityIcons
        name="chevron-left"
        size={verticalScale(iconSize)}
        color={currentTheme === "dark" ? colors.white : colors.black}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    // backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
    borderColor: colors.neutral500,
    borderWidth: 0.3,
  },
});
