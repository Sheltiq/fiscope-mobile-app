import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Button from '@/components/Button';
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from 'expo-router';

const WelcomePage = () => {
    const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login button & image */}
        <View>
          <TouchableOpacity onPress={() => router.push('/auth/login')} style={styles.loginButton}>
            <Typo fontWeight={700}>Войти</Typo>
          </TouchableOpacity>

          {/* Анимированное приветственное изображение с эффектом появления */}
          <Animated.Image entering={FadeIn.duration(1000)} source={require("../../assets/images/welcome.png")}
          style={styles.welcomeImage}
          resizeMode="contain" />
        </View>

        {/* footer */}
        <View style={styles.footer}> 
          {/* Анимированный заголовок с пружинным эффектом */}
          <Animated.View entering={FadeInDown.duration(1000).springify().damping(12)} 
          style={{ alignItems: "center" }}>
            <Typo size={25} fontWeight={"800"}> 
              Всегда следите за своими
            </Typo>
            <Typo size={25} fontWeight={"800"}>
              финансами
            </Typo>
          </Animated.View >

           {/* Анимированный подзаголовок с задержкой и эффектом пружины */}
          <Animated.View entering={FadeInDown.duration(1000).delay(100).springify().damping(12)} 
          style={{ alignItems: "center", gap: 2 }}>
            <Typo size={15} color = {colors.textLight}> 
              Финансы должны быть упорядочены,
            </Typo>
            <Typo size={15} color = {colors.textLight}>
              чтобы в будущем вести лучший образ жизни
            </Typo>
          </Animated.View>

          {/* Анимированная кнопка с наибольшей задержкой появления */}
          <Animated.View
          entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}
           style={styles.buttonContainer}>
            <Button onPress={() => router.push('/auth/register')}>
              <Typo size={23} fontWeight={700}>
                Начать
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  )
}


// Определяем стили для компонентов страницы
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});

export default WelcomePage;