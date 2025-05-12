import { StyleSheet, Text, View, Platform } from "react-native";
import React, { useContext, useEffect } from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
import ThemeProvider, { ThemeContext } from "@/contexts/themeContext";
import * as SystemUI from "expo-system-ui";
import { colors } from "@/constants/theme";

const StackLayot = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="modals/profileModal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="modals/walletModal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="modals/transactionModal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="modals/searchModal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="modals/settingsModal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="modals/contactModal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemedLayout />
      </ThemeProvider>
    </AuthProvider>
  );
}
function ThemedLayout() {
  const { currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(
      currentTheme === "dark" ? "black" : "white"
    );
  }, [currentTheme]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          currentTheme === "dark" ? colors.neutral800 : colors.bgScreenLight,
      }}
    >
      <StackLayot />
    </View>
  );
}

const styles = StyleSheet.create({});
