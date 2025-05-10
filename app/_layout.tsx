import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
import ThemeProvider from "@/contexts/themeContext";

const StackLayot = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="modals/profileModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/walletModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/transactionModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/searchModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/settingsModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/contactModal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StackLayot />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
