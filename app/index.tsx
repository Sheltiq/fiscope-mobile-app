import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { colors } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";
import { ThemeContext } from "@/contexts/themeContext";
// import { useRouter } from 'expo-router'

const SplashScreen = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/auth/welcome')
  //   }, 1000);
  // },[])

  const { currentTheme } = useContext(ThemeContext);

  return (
    <ScreenWrapper
      style={[
        styles.container,
        {
          backgroundColor:
            currentTheme === "dark" ? colors.neutral900 : colors.bgScreenLight,
        },
      ]}
    >
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/splash.png")}
      />
    </ScreenWrapper>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.neutral900,
  },
  logo: {
    height: "30%",
    aspectRatio: "1",
  },
});
