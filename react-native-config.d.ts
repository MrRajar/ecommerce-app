declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL?: string;
    APP_ENV?: string;
    APP_NAME?: string;
  }

  const Config: NativeConfig;
  export default Config;
}