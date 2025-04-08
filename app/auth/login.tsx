import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native';
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Login = () => {

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async ()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Войти', "Пожалуйста заполните все поля")
      return;
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"}>
            Привет!
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Добро пожаловать обратно
          </Typo>
        </View>

        {/* Форма */}

        <View style={styles.form}>
          <Typo size={14} color={colors.textLighter}>
            Войдите чтобы отслеживать все свои расходы
          </Typo>
          <Input
            placeholder="Введите адрес электронной почты"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <Icons.SignIn
                size={verticalScale(22)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Введите пароль"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Icons.Password
                size={verticalScale(22)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Typo size={14} color={colors.text} style={{alignSelf: 'flex-end'}}>
            Забыли пароль!?
          </Typo>

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.white} size={20}>
              Войти
            </Typo>
          </Button>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Typo size={15}>У вас нет аккаунта?</Typo>
          <Pressable onPress={() => router.replace("/auth/register")}>
            <Typo size={15} fontWeight={'700'} color={colors.primary}>
              Зарегистрироваться
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});