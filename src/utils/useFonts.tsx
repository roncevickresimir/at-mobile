import * as Font from "expo-font";

const useFonts = async () =>
  await Font.loadAsync({
    WalsheimProBlack: require("./../../assets/fonts/WalsheimPro/GTWalsheimPro-Black.ttf"),
    WalsheimProBold: require("./../../assets/fonts/WalsheimPro/GTWalsheimPro-Bold.ttf"),
    WalsheimProRegular: require("./../../assets/fonts/WalsheimPro/GTWalsheimPro-Regular.ttf"),
    WalsheimProThin: require("./../../assets/fonts/WalsheimPro/GTWalsheimPro-Thin.ttf"),
    WalsheimProLight: require("./../../assets/fonts/WalsheimPro/GTWalsheimPro-Light.ttf"),
  });

export default useFonts;
