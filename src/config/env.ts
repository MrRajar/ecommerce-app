import Config from 'react-native-config';

export const ENV = {
  API_BASE_URL: Config.API_BASE_URL || '',
  APP_ENV: Config.APP_ENV || 'development',
  APP_NAME: Config.APP_NAME || 'App',
};

export default ENV;