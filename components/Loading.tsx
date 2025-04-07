import {ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View,
  } from "react-native";
  import React from "react";
  import { colors } from "@/constants/theme";
  
  const Loading = ({
    size = "large", // По умолчанию используем большой размер
    color = colors.primary, // По умолчанию используем основной цвет из темы
  }: ActivityIndicatorProps) => {
    return (
      // Контейнер с индикатором загрузки, центрированный по вертикали и горизонтали
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Сам индикатор загрузки с заданными параметрами размера и цвета */}
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  };
  
  export default Loading;
  
  const styles = StyleSheet.create({});