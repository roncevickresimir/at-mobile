import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabBar } from '~components';
import { CompletedQuestsPage, LandingPage, MyProfilePage, QuestPage, RewardsPage, StationPage } from '~screens';
import { useAppSelector } from '~utils';

import { AuthStack } from './AuthStack';
import PATHS from '.PATHS';

const Tabs = createBottomTabNavigator();

const LandingPageStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="App"
        component={LandingPage}
        options={
          {
            // animationEnabled: false,
          }
        }
      />
      <Stack.Screen name={PATHS.QUEST_PAGE.key} component={QuestPage} options={{ title: PATHS.QUEST_PAGE.name }} />
      <Stack.Screen
        name={PATHS.STATION_PAGE.key}
        component={StationPage}
        options={{ title: PATHS.STATION_PAGE.name }}
      />
    </Stack.Navigator>
  );
};

export const RootStack = () => {
  const userToken = useAppSelector((state) => state.auth.token);

  const Stack = createNativeStackNavigator();

  return userToken ? (
    <Tabs.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name={PATHS.LANDING_PAGE.key}
        component={LandingPageStack}
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
  ) : (
    <AuthStack />
  );
};
