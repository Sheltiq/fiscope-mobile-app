import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import Typo from "@/components/Typo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SettingsButtonProps } from "@/types";

const SettingsButton = ({
  title,
  icon,
  onPress,
  isActive,
}: SettingsButtonProps) => {
  return (
    <TouchableOpacity style={styles.settingsButton} onPress={onPress}>
      <View style={styles.titleWrapper}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.white} />
        <Typo size={15} fontWeight={"medium"}>
          {title}
        </Typo>
      </View>
      <MaterialCommunityIcons
        name={isActive ? "check-circle" : "checkbox-blank-circle-outline"}
        size={20}
        color={isActive ? colors.primaryLight : colors.white}
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
    backgroundColor: colors.neutral600,
    padding: 20,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
