import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";
import { ThemeContext } from "@/contexts/themeContext";

const _layout = () => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Tabs
      tabBar={(props) => <CustomTabs {...props} currentTheme={currentTheme} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="statistics" />
      <Tabs.Screen name="wallet" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
