// src/theme/themes.ts
export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export type AppTheme = {
  mode: ResolvedTheme;
  colors: {
    background: string;
    surface: string;
    card: string;
    text: string;
    subText: string;
    border: string;
    primary: string;
    danger: string;
    inputBg: string;
    inputBorder: string;
    placeholder: string;
    tabBg: string;
    tabBorder: string;
    shadow: string;
  };
};

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#FDFDFD',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#111111',
    subText: '#666666',
    border: '#EAEAEA',
    primary: '#F83758',
    danger: '#DC2626',
    inputBg: '#F8F8F8',
    inputBorder: '#D7D7D7',
    placeholder: '#9CA3AF',
    tabBg: '#FFFFFF',
    tabBorder: '#EEEEEE',
    shadow: '#000000',
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#0F1115',
    surface: '#161A22',
    card: '#1A1F29',
    text: '#F3F4F6',
    subText: '#A1A1AA',
    border: '#2A3140',
    primary: '#FF5C7E',
    danger: '#F87171',
    inputBg: '#1A1F29',
    inputBorder: '#2A3140',
    placeholder: '#71717A',
    tabBg: '#12161D',
    tabBorder: '#232A36',
    shadow: '#000000',
  },
};