import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ContactButtonProps } from "@/types";
import { ThemeContext } from "@/contexts/themeContext";
import { colors } from "@/constants/theme";
import Typo from "./Typo";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const ContactButton = ({ title, icon, onPress }: ContactButtonProps) => {
  const { currentTheme } = useContext(ThemeContext);
  let iconColor;

  if (icon === "github") {
    iconColor = currentTheme === "dark" ? colors.white : colors.black;
  } else if (icon === "telegram") {
    iconColor = currentTheme === "dark" ? colors.white : colors.primary;
  }

  return (
    <TouchableOpacity
      style={[
        styles.contactButton,
        {
          backgroundColor:
            currentTheme === "dark" ? colors.neutral600 : colors.btnLight,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.titleWrapper}>
        <FontAwesome name={icon} size={25} color={iconColor} />
        <Typo size={18} fontWeight={"medium"}>
          {title}
        </Typo>
      </View>
    </TouchableOpacity>
  );
};

export default ContactButton;

const styles = StyleSheet.create({
  contactButton: {
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
