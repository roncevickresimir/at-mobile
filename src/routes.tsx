import PATHS from "./paths";

import LandingPage from "./app/screens/LandingPage";
import QuestsPage from "./app/screens/QuestPage";
import RewardsPage from "./app/screens/RewardsPage";
import MyProfilePage from "./app/screens/MyProfilePage";
import AdditionalInfoPage from "./app/screens/AdditionalInfoPage";
import SettingsPage from "./app/screens/SettingsPage";
import ChangePasswordPage from "./app/screens/ChangePasswordPage";
import AboutPage from "./app/screens/AboutPage";
import LinkToOtherServicesPage from "./app/screens/LinkToOtherServicesPage";
import CompletedQuestsPage from "./app/screens/CompletedQuestsPage";
import LoginSreen from "./app/screens/LoginScreen";

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
    component: LoginSreen,
  } as PATH,
  {
    ...PATHS.LANDING_PAGE,
    component: LandingPage,
  } as PATH,
  {
    ...PATHS.QUESTS_PAGE,
    component: QuestsPage,
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
