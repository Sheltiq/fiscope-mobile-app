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

const Register = () => {

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async ()=>{
    if(!emailRef.current || !passwordRef.current || !nameRef.current ){
      Alert.alert('Зарегистрироваться', "Пожалуйста заполните все поля")
      return;
    }
  }


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"}>
            Рады видеть тебя!
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Следи за расходами с нами!
          </Typo>
        </View>

        {/* Форма */}

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Создай аккаунт для учета расходов
          </Typo>
          <Input
            placeholder="Введите свое имя"
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <Icons.User
                size={verticalScale(22)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
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


          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.white} size={20}>
              Зарегистрироваться
            </Typo>
          </Button>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Typo size={15}>У вас уже есть аккаунт?</Typo>
          <Pressable onPress={() => router.replace("/auth/login")}>
            <Typo size={15} fontWeight={'700'} color={colors.primary}>
              Войти
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Register

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