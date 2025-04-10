import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BackButtonProps } from '@/types';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { verticalScale } from '@/utils/styling';
import { colors, radius } from '@/constants/theme';

const BackButton = ({
  style,
  iconSize = 26,
}: BackButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={verticalScale(iconSize)}
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export default BackButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
  },
});