import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PATHS from '../../paths';
import { CreateAccount, LoginScreen } from '../screens';

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={PATHS.CREATE_ACCOUNT.key}
        component={CreateAccount}
        options={{ title: PATHS.CREATE_ACCOUNT.name }}
      />
      <Stack.Screen
        name={PATHS.LOGIN_SCREEN.key}
        component={LoginScreen}
        options={{ title: PATHS.LOGIN_SCREEN.name }}
      />
    </Stack.Navigator>
  );
};
