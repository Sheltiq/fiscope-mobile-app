import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/authContext';

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
  </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayot />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});