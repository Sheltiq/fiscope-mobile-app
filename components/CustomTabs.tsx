import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Компонент для кастомной нижней панели навигации
export default function CustomTabs({
  state,
  descriptors,
  navigation,
  currentTheme,
}: BottomTabBarProps & { currentTheme: string }) {
  // Иконки для каждой вкладки, зависят от состояния (выбрана или нет)
  const tabbarIcons: any = {
    index: (isFocused: boolean) => (
      <MaterialCommunityIcons
        name="home"
        size={verticalScale(30)}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    statistics: (isFocused: boolean) => (
      <MaterialCommunityIcons
        name="chart-bar"
        size={verticalScale(30)}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    wallet: (isFocused: boolean) => (
      <MaterialCommunityIcons
        name="wallet"
        size={verticalScale(30)}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    profile: (isFocused: boolean) => (
      <MaterialCommunityIcons
        name="account-circle"
        size={verticalScale(30)}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
  };

  return (
    <View
      style={[
        styles.tabbar,
        {
          backgroundColor:
            currentTheme === "dark" ? colors.neutral800 : colors.btnLight,
        },
        {
          borderTopColor:
            currentTheme === "dark"
              ? colors.neutral800
              : colors.borderColorFooterLight,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // Получение метки для вкладки (название или пользовательская метка)
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // Проверка, выбрана ли текущая вкладка
        const isFocused = state.index === index;

        // Обработчик нажатия на вкладку
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // Обработчик долгого нажатия на вкладку
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {
              // Рендеринг иконки для текущей вкладки
              tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  // Стили для нижней панели навигации
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS == "ios" ? verticalScale(73) : verticalScale(55),
    // backgroundColor: colors.neutral800,
    justifyContent: "space-around",
    alignItems: "center",
    // borderTopColor: colors.borderColorFooterLight,
    borderTopWidth: 1,
  },
  // Стили для элемента вкладки
  tabbarItem: {
    marginBottom: Platform.OS == "ios" ? spacingY._10 : spacingY._5,
    justifyContent: "center",
    alignItems: "center",
  },
});
