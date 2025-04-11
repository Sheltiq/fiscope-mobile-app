import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/authContext';
import Typo from '@/components/Typo';
import { Image } from 'expo-image';
import { getProfileImage } from '@/services/imageService';
import { accountOptionType } from '@/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, { FadeInDown } from "react-native-reanimated";
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'expo-router';

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Массив опций аккаунта для отображения в профиле
  const accountOptions: accountOptionType[] = [
    {
      title: "Редактировать профиль",
      icon: <MaterialCommunityIcons size={26} name="account-outline" color={colors.white}/>,
      routeName: "/modals/profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Настройки",
      icon: <MaterialIcons size={26} name="settings" color={colors.white}/>,
      // routeName: "/modals/settingsModal",
      bgColor: "#059669",
    },
    {
      title: "Политика конфиденциальности",
      icon: <MaterialCommunityIcons size={26} name="file-lock-outline" color={colors.white}/>,
      // routeName: "/modals/privacyModal",
      bgColor: colors.neutral600,
    },
    {
      title: "Выйти",
      icon: <AntDesign size={26} name="logout" color={colors.white}/>,
      // routeName: "/modals/profileModal",
      bgColor: "#e11d48",
    },
  ];

  // Функция для выхода из аккаунта
  const handleLogout = async () => {
    await signOut(auth);
  }

  // Показать диалоговое окно подтверждения выхода
  const showLogoutAlert = ()=>{
    Alert.alert("Подтвердить", "Вы уверены, что хотите выйти из системы?", [
      {
        text: "Отмена",
        // onPress: ()=> console.log("отмена выхода"),
        style: 'cancel',
      },
      {
        text: "Выход",
        onPress: ()=> handleLogout(),
        style: 'destructive',
      },
    ]);
  };

  // Обработчик нажатий на опции аккаунта
  const handlePress = (item: accountOptionType) => {
    if(item.title == "Выйти") {
      showLogoutAlert();
    }

    if(item.routeName) router.push(item.routeName);
  };


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Профиль" style={{ marginVertical: spacingY._10 } } />

        {/* Секция с информацией о пользователе */}
        <View style={styles.userInfo}>

          <View>

            <Image source={getProfileImage(user?.image)} style={styles.avatar} contentFit="cover" transition={100} />

          </View>

          {/* Контейнер с именем и email пользователя */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"medium"} color={colors.neutral100}> {user?.name} </Typo>
            <Typo size={15} color={colors.neutral400}> {user?.email} </Typo>
          </View>
        </View>

        {/* Список опций аккаунта с анимацией */}
        <View style ={styles.accountOptions}>
          {
            accountOptions.map((item, index) => {
              return(
                <Animated.View key={index.toString()} entering={FadeInDown.delay(index * 50).springify().damping(14)} style={styles.listItem}> 
                  <TouchableOpacity style={styles.flexRow} onPress={()=> handlePress(item)}>
                    <View style={[
                      styles.listIcon,
                      {
                        backgroundColor: item?.bgColor,
                      },
                    ]}>
                      {item.icon && item.icon}
                    </View>
                    <Typo size={14} style={{flex: 1}} fontWeight={"medium"}> {item.title}</Typo>
                    <MaterialCommunityIcons name="chevron-right" size={verticalScale(30)} color={colors.white}/>
                  </TouchableOpacity>
                </Animated.View>
              )
            })
          }

        </View>

      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});