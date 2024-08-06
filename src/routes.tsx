import {
  AboutPage,
  AdditionalInfoPage,
  ChangePasswordPage,
  CompletedQuestsPage,
  LandingPage,
  LinkToOtherServicesPage,
  LoginScreen,
  MyProfilePage,
  QuestPage,
  RewardsPage,
  SettingsPage,
} from '~screens';

import PATHS from '.PATHS';

export interface PATH {
  key: string;
  component: React.FC;
  path: string;
  exact: boolean;
  PATHS?: object;
  name: string;
}

const routes: PATH[] = [
  {
    ...PATHS.LOGIN_SCREEN,
    component: LoginScreen,
  } as PATH,
  {
    ...PATHS.LANDING_PAGE,
    component: LandingPage,
  } as PATH,
  {
    ...PATHS.QUEST_PAGE,
    component: QuestPage,
  } as PATH,
  {
    ...PATHS.REWARDS_PAGE,
    component: RewardsPage,
  } as PATH,
  {
    ...PATHS.MY_PROFILE,
    component: MyProfilePage,
  } as PATH,
  {
    ...PATHS.COMPLETED_QUESTS,
    component: CompletedQuestsPage,
  } as PATH,
  {
    ...PATHS.MY_PROFILE.PATHS.ABOUT,
    component: SettingsPage,
  } as PATH,
  {
    ...PATHS.MY_PROFILE.PATHS.ADDITIONAL_INFO,
    component: ChangePasswordPage,
  } as PATH,
  {
    ...PATHS.MY_PROFILE.PATHS.CHANGE_PASSWORD,
    component: AboutPage,
  } as PATH,
  {
    ...PATHS.MY_PROFILE.PATHS.SETINGS,
    component: LinkToOtherServicesPage,
  } as PATH,
  {
    ...PATHS.MY_PROFILE.PATHS.LINK_PROFILE_TO_OTHER_SERVICES,
    component: CompletedQuestsPage,
  } as PATH,
];

export default routes;
