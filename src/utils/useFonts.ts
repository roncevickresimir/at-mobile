import * as Font from 'expo-font';

export const loadFonts = async (): Promise<void> => {
  return await Font.loadAsync({
    WalsheimProBlack: require('./../../assets/fonts/WalsheimPro/GTWalsheimPro-Black.ttf'),
    WalsheimProBold: require('./../../assets/fonts/WalsheimPro/GTWalsheimPro-Bold.ttf'),
    WalsheimProRegular: require('./../../assets/fonts/WalsheimPro/GTWalsheimPro-Regular.ttf'),
    WalsheimProThin: require('./../../assets/fonts/WalsheimPro/GTWalsheimPro-Thin.ttf'),
    WalsheimProLight: require('./../../assets/fonts/WalsheimPro/GTWalsheimPro-Light.ttf'),
  });
};
