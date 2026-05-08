// src/theme/ThemeProvider.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ThemeMode,
  ResolvedTheme,
  AppTheme,
  lightTheme,
  darkTheme,
} from './themes';

const THEME_MODE_KEY = '@app_theme_mode';

type ThemeContextValue = {
  themeMode: ThemeMode;              // user preference
  resolvedTheme: ResolvedTheme;      // actual applied (light/dark)
  theme: AppTheme;
  isThemeReady: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const resolveTheme = (
  mode: ThemeMode,
  systemScheme: ColorSchemeName
): ResolvedTheme => {
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';
  return systemScheme === 'dark' ? 'dark' : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isThemeReady, setIsThemeReady] = useState(false);

  // load saved preference
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_MODE_KEY);
        if (saved === 'system' || saved === 'light' || saved === 'dark') {
          setThemeModeState(saved);
        }
      } catch (e) {
        console.log('Failed to load theme mode', e);
      } finally {
        setIsThemeReady(true);
      }
    };

    loadThemeMode();
  }, []);

  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(THEME_MODE_KEY, mode);
    } catch (e) {
      console.log('Failed to save theme mode', e);
    }
  }, []);

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    return resolveTheme(themeMode, systemScheme);
  }, [themeMode, systemScheme]);

  const theme = useMemo<AppTheme>(() => {
    return resolvedTheme === 'dark' ? darkTheme : lightTheme;
  }, [resolvedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      resolvedTheme,
      theme,
      isThemeReady,
      setThemeMode,
    }),
    [themeMode, resolvedTheme, theme, isThemeReady, setThemeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }
  return ctx;
};