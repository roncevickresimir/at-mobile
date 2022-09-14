import * as React from "react";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import IRootStackScreenProp from "./src/app/interfaces/IRootStackScreenProp";
import { useAppSelector } from "./src/utils/hooks";
import { persistor, store } from "./src/store";
import { useLazyGetServerVersionQuery } from "./src/services/utilService";
import { useCallback, useEffect, useState } from "react";
import { logout, setServerVersion } from "./src/app/slices/authSlice";
import { logoutUser } from "./src/app/slices/userSlice";
import LoginSreen from "./src/app/screens/LoginScreen";
import CreateAccount from "./src/app/screens/CreateAccount";
import PATHS from "./src/paths";
import LandingPage from "./src/app/screens/LandingPage";
import MyProfilePage from "./src/app/screens/MyProfilePage";
import { AppRegistry, SafeAreaView, View } from "react-native";
import useFonts from "./src/utils/useFonts";
import TabBar from "./src/app/components/TabBar";
import QuestPage from "./src/app/screens/QuestPage";
import StationPage from "./src/app/screens/StationPage";
import CompletedQuestsPage from "./src/app/screens/CompletedQuestsPage";
import RewardsPage from "./src/app/screens/RewardsPage";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen
      name={PATHS.CREATE_ACCOUNT.key}
      component={CreateAccount}
      options={{ title: PATHS.CREATE_ACCOUNT.name }}
    />
    <AuthStack.Screen
      name={PATHS.LOGIN_SCREEN.key}
      component={LoginSreen}
      options={{ title: PATHS.LOGIN_SCREEN.name }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const QuestsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const RewardsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerScreen = () => (
  <Tabs.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tabs.Screen
      name={PATHS.LANDING_PAGE.key}
      component={LandingPage}
      options={{ title: PATHS.LANDING_PAGE.name, headerShown: false }}
    />
    <Tabs.Screen
      name={PATHS.COMPLETED_QUESTS.key}
      component={CompletedQuestsPage}
      options={{ title: PATHS.COMPLETED_QUESTS.name, headerShown: false }}
    />
    <Tabs.Screen
      name={PATHS.REWARDS_PAGE.key}
      component={RewardsPage}
      options={{ title: PATHS.REWARDS_PAGE.name, headerShown: false }}
    />
    <Tabs.Screen
      name={PATHS.MY_PROFILE.key}
      component={MyProfilePage}
      options={{ title: PATHS.MY_PROFILE.name, headerShown: false }}
    />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = (props: IRootStackScreenProp) => {
  const { userToken, versionSame } = props;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { height: "100%" },
      }}
    >
      {userToken /*|| versionSame */ ? (
        <>
          <RootStack.Screen
            name="App"
            component={DrawerScreen}
            options={{
              animationEnabled: false,
            }}
          />
          <RootStack.Screen
            name={PATHS.QUEST_PAGE.key}
            component={QuestPage}
            options={{ title: PATHS.QUEST_PAGE.name }}
          />
          <RootStack.Screen
            name={PATHS.STATION_PAGE.key}
            component={StationPage}
            options={{ title: PATHS.STATION_PAGE.name }}
          />
        </>
      ) : (
        <RootStack.Screen
          name="unauth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

const App: React.FC = () => {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
    SetIsReady(true);
  };

  const userToken = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const version = useAppSelector((state) => state.auth.serverVersion);

  const [versionSame, setVersionSame] = useState<boolean>(false);

  const [
    getServerVersion,
    { data: serverVersionData, isSuccess: serverVersionDataIsSuccess },
  ] = useLazyGetServerVersionQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    getServerVersion();
  }, []);

  useEffect(() => {
    if (serverVersionDataIsSuccess) {
      if (version != serverVersionData) {
        if (userId) {
          persistor.purge();
          dispatch(logout());
          dispatch(logoutUser());
          dispatch({ type: "USER_LOGOUT" });
          setVersionSame(false);
        }

        dispatch(setServerVersion(serverVersionData || "0.0.0"));

        setVersionSame(true);
      } else setVersionSame(true);
    }
  }, [version, serverVersionDataIsSuccess]);

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} versionSame={versionSame} />
      </NavigationContainer>
    </PersistGate>
  );
};

const BaseApp: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <App />
      </SafeAreaView>
    </Provider>
  );
};

AppRegistry.registerComponent("App", () => BaseApp);

export default BaseApp;
