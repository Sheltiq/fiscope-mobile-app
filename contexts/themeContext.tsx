import { ThemeContextType } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<ThemeContextType>({
  isSystemTheme: false,
  currentTheme: "dark",
  toggleTheme: () => {},
  useSystemTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorSheme = useColorScheme();
  const [theme, setTheme] = useState<string>("dark");
  const [systemTheme, setSystemTheme] = useState<boolean>(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedThemeObject = await AsyncStorage.getItem("theme");
        const savedThemeObjectData = JSON.parse(savedThemeObject!);

        if (savedThemeObjectData) {
          setTheme(savedThemeObjectData.mode);
          setSystemTheme(savedThemeObjectData.system);
        }
      } catch (error) {
        console.log("Ошибка загрузки темы.", error);
      }
    };
    getTheme();
  }, []);

  useEffect(() => {
    if (colorSheme && systemTheme) {
      const themeObject = {
        mode: colorSheme,
        system: true,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObject));
      setTheme(colorSheme);
      setSystemTheme(true);
    }
  }, [colorSheme]);

  const toggleTheme = (newTheme: string) => {
    const themeObject = {
      mode: newTheme,
      system: false,
    };
    AsyncStorage.setItem("theme", JSON.stringify(themeObject));
    setTheme(newTheme);
    setSystemTheme(false);
  };

  const useSystemTheme = () => {
    if (colorSheme) {
      const themeObject = {
        mode: colorSheme,
        system: true,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObject));
      setTheme(colorSheme);
      setSystemTheme(true);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        toggleTheme,
        useSystemTheme,
        isSystemTheme: systemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
