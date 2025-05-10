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
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<string>(colorScheme || "dark");
  const [systemTheme, setSystemTheme] = useState<boolean>(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedThemeObject = await AsyncStorage.getItem("theme");
        const savedThemeObjectData = JSON.parse(savedThemeObject!);

        if (savedThemeObjectData) {
          setTheme(savedThemeObjectData.mode);
          setSystemTheme(savedThemeObjectData.system);
        } else {
          const themeObject = {
            mode: colorScheme || "dark",
            system: true,
          };
          AsyncStorage.setItem("theme", JSON.stringify(themeObject));
          setTheme(themeObject.mode);
          setSystemTheme(true);
        }
      } catch (error) {
        console.log("Ошибка загрузки темы.", error);
      }
    };
    getTheme();
  }, [colorScheme]);

  useEffect(() => {
    if (colorScheme && systemTheme) {
      const themeObject = {
        mode: colorScheme,
        system: true,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObject));
      setTheme(colorScheme);
    }
  }, [colorScheme, systemTheme]);

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
    if (colorScheme) {
      const themeObject = {
        mode: colorScheme,
        system: true,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObject));
      setTheme(colorScheme);
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
