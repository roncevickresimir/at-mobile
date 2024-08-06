import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LandingPage, QuestPage, StationPage } from '~screens';
import { useAppSelector } from '~utils';

import { AuthStack } from './AuthStack';
import PATHS from '.PATHS';

export const RootStack = () => {
  const userToken = useAppSelector((state) => state.auth.token);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userToken ? (
        <>
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
        </>
      ) : (
        <Stack.Screen
          name="unauth"
          component={AuthStack}
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      )}
    </Stack.Navigator>
  );
};
