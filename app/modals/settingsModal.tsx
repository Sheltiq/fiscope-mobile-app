import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { colors, spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import SettingsButton from "@/components/SettingsButton";
import { ThemeContext } from "@/contexts/themeContext";

const SettingsModal = () => {
  const { currentTheme, toggleTheme, useSystemTheme, isSystemTheme } =
    useContext(ThemeContext);
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={"Настройки"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Typo color={colors.neutral200} size={16}>
              Тема приложения
            </Typo>
            <SettingsButton
              title="Светлая"
              icon="lightbulb-on"
              onPress={() => {
                toggleTheme("light");
              }}
              isActive={!isSystemTheme && currentTheme === "light"}
            />
            <SettingsButton
              title="Темная"
              icon="weather-night"
              onPress={() => {
                toggleTheme("dark");
              }}
              isActive={!isSystemTheme && currentTheme === "dark"}
            />
            <SettingsButton
              title="Системная"
              icon="theme-light-dark"
              onPress={() => {
                useSystemTheme();
              }}
              isActive={isSystemTheme}
            />
          </View>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },
  form: {
    gap: spacingY._20,
    paddingVertical: spacingY._15,
    paddingBottom: spacingY._40,
  },
});
