import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

import { QuestList, QuestsCarousel } from '~components';
import { IQuest } from '~interfaces';
import { useLazyGetCompletedQuestsQuery } from '~services';
import { globalStyles } from '~styles';
import { useAppSelector } from '~utils';

export const CompletedQuestsPage = () => {
  const [quests, setQuests] = useState<IQuest[]>([]);
  const user = useAppSelector((state) => state?.auth?.user);

  const navigation = useNavigation();

  const [getQuests, { isLoading: listLoading, isUninitialized: listUninitialized }] = useLazyGetCompletedQuestsQuery();

  const fetchData = async () => {
    if (user?.id) {
      const getQuestsResponse = await getQuests(user.id).unwrap();
      setQuests(getQuestsResponse);
    }
  };

  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  return (
    <View style={[{ flex: 1 }, LandingPageStyles.view]}>
      <View style={LandingPageStyles.header}>
        <View style={LandingPageStyles.user}>
          <View style={LandingPageStyles.userInfoContainer}>
            <View style={LandingPageStyles.avatarContainer}>
              <Image
                style={LandingPageStyles.avatarImage}
                source={/*user?.image ? user.image : */ require('./../assets/images/avatar.png')}
              ></Image>
            </View>
            <View style={LandingPageStyles.usernameContainer}>
              <Text style={globalStyles?.lightText}>
                {t('LANDING.HELLO')}
                {` `}
                {user?.username}
              </Text>
              <Text style={globalStyles?.normalText}>{t('LANDING.WELCOME')}</Text>
            </View>
          </View>
          <View style={LandingPageStyles.notificationContainer}></View>
        </View>
      </View>

      {quests.length ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={LandingPageStyles.questSliderContainer}>
            <Text style={[globalStyles?.h2, globalStyles?.font18, globalStyles?.p20]}>
              {t('COMPLETED_QUESTS.IN_PROGRESS')}
            </Text>
            <QuestsCarousel items={quests} />
            <View style={LandingPageStyles.questListContainer}>
              <Text style={[globalStyles?.h2, globalStyles?.font18, globalStyles?.p20, globalStyles?.colorSecondary]}>
                {t('COMPLETED_QUESTS.COMPLETE')}
              </Text>
              <QuestList items={quests} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={LandingPageStyles.noQuests}>
          <Text style={[globalStyles?.h2, globalStyles?.font18, globalStyles?.p20, LandingPageStyles.noQuestsFont]}>
            {t('COMPLETED_QUESTS.NO_QUESTS_AVAILABLE')}
          </Text>
          <Text style={[globalStyles?.lightText, globalStyles?.font14, LandingPageStyles.noQuestsP]}>
            {t('COMPLETED_QUESTS.NO_QUESTS_TRY_DIFFERENT')}
          </Text>
          <Image style={LandingPageStyles.noQuestsImage} source={require('./../assets/images/no_quests.png')}></Image>
        </View>
      )}
    </View>
  );
};

const LandingPageStyles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    backgroundColor: globalStyles?.colorWhite.color,
  },
  header: {
    width: '100%',
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingBottom: 20,
    borderRadius: 10,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    paddingTop: 50,
  },

  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 51,
    height: 51,
    borderRadius: 100,
    backgroundColor: '#FF9254',
    marginRight: 15,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    opacity: 0.8,
    resizeMode: 'contain',
  },
  usernameContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  notificationContainer: {},

  questSliderContainer: {
    width: '100%',
    marginBottom: -20,
  },
  questListContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  noQuests: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noQuestsFont: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  noQuestsP: {
    marginTop: 10,
    marginBottom: 45,
  },
  noQuestsImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  questImageContainer: {},
  questImage: {},
  questInfoContainer: {},
});