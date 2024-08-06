import * as React from 'react';

export interface PATH {
  key: string;
  component: React.FC;
  path: string;
  exact: boolean;
  PATHS?: object;
  name: string;
}

const PATHS = {
  LOGIN_SCREEN: {
    key: 'PATHS.LOGIN_SCREEN',
    path: '/login',
    exact: true,
    name: 'LoginScreen',
  },
  CREATE_ACCOUNT: {
    key: 'PATHS.CREATE_ACCOUNT',
    path: '/register',
    exact: true,
    name: 'CreateAccount',
  },
  LANDING_PAGE: {
    key: 'PATHS.LANDING_PAGE',
    path: '/',
    exact: true,
    name: 'LandingPage',
  },
  QUEST_PAGE: {
    key: 'PATHS.QUEST_PAGE',
    path: '/quest',
    exact: true,
    name: 'QuestPage',
  },
  STATION_PAGE: {
    key: 'PATHS.STATION_PAGE',
    path: '/station',
    exact: true,
    name: 'StationPage',
  },
  REWARDS_PAGE: {
    key: 'PATHS.REWARDS_PAGE',
    path: '/rewards',
    exact: true,
    name: 'RewardsPage',
  },
  MY_PROFILE: {
    key: 'PATHS.MY_PROFILE.DEFAULT',
    path: '/my-profile',
    exact: true,
    name: 'MyProfilePage',
    PATHS: {
      ADDITIONAL_INFO: {
        key: 'PATHS.MY_PROFILE.ADDITIONAL_INFO',
        path: '/additional-info',
        exact: true,
        name: 'AdditionalInfoPage',
      },
      SETINGS: {
        key: 'PATHS.MY_PROFILE.SETINGS',
        path: '/settings',
        exact: true,
        name: 'SettingsPage',
      },
      CHANGE_PASSWORD: {
        key: 'PATHS.MY_PROFILE.CHANGE_PASSWORD',
        path: '/change-password-page',
        exact: true,
        name: 'ChangePasswordPage',
      },
      ABOUT: {
        key: 'PATHS.MY_PROFILE.ABOUT',
        path: '/about',
        exact: true,
        name: 'AboutPage',
      },
      LINK_PROFILE_TO_OTHER_SERVICES: {
        key: 'PATHS.MY_PROFILE.LINK_PROFILE_TO_OTHER_SERVICES',
        path: '/link-to-other-services',
        exact: true,
        name: 'LinkToOtherServicesPage',
      },
    },
  },
  COMPLETED_QUESTS: {
    key: 'PATHS.COMPLETED_QUESTS',
    path: '/completed-quests',
    exact: true,
    name: 'CompletedQuestsPage',
  },
};

export default PATHS;
