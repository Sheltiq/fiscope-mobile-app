import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/theme";
import Typo from "@/components/Typo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SettingsButtonProps } from "@/types";
import { ThemeContext } from "@/contexts/themeContext";

const SettingsButton = ({
  title,
  icon,
  onPress,
  isActive,
}: SettingsButtonProps) => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        styles.settingsButton,
        {
          backgroundColor:
            currentTheme === "dark" ? colors.neutral600 : colors.btnLight,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.titleWrapper}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={currentTheme === "dark" ? colors.white : colors.black}
        />
        <Typo size={15} fontWeight={"medium"}>
          {title}
        </Typo>
      </View>
      <MaterialCommunityIcons
        name={isActive ? "check-circle" : "checkbox-blank-circle-outline"}
        size={20}
        color={
          isActive
            ? colors.primaryLight
            : currentTheme === "dark"
            ? colors.white
            : colors.black
        }
      />
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  settingsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: colors.neutral600,
    padding: 20,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 10,
    borderColor: colors.neutral400,
    borderWidth: 0.4,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
