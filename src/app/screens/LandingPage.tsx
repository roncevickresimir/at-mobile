import { useEffect, useState } from 'react';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import { SearchBar } from 'react-native-screens';

import { CategorySelect, QuestList, QuestsCarousel } from '~components';
import { IQuest } from '~interfaces';
import { IGetQuestsPayload, useLazyGetQuestsQuery } from '~services';
import { globalStyles } from '~styles';

import { useAppSelector } from '../../utils/hooks';

export const LandingPage = () => {
  const [quests, setQuests] = useState<IQuest[]>([]);
  const [category, setCategory] = useState<string>('');

  const user = useAppSelector((state) => state?.auth?.user?.User);
  const navigation = useNavigation();

  const [getQuests, { isLoading: listLoading, isUninitialized: listUninitialized }] = useLazyGetQuestsQuery();

  const [getQuestsPayload, setGetQuestsPayload] = useState<IGetQuestsPayload>({
    search: '',
    page: 1,
    rpp: 10,
    category: undefined,
  });

  const fetchData = async () => {
    const getQuestsResponse = await getQuests(getQuestsPayload).unwrap();
    setQuests(getQuestsResponse);
  };

  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });
    return willFocusSubscription;
  }, [getQuestsPayload]);

  useEffect(() => {
    setGetQuestsPayload({ ...getQuestsPayload, category: category });
  }, [category]);

  const { height } = Dimensions.get('screen');

  return (
    <View style={[{ flex: 1 }, LandingPageStyles.view]}>
      <View style={LandingPageStyles.header}>
        <View style={LandingPageStyles.user}>
          <View style={LandingPageStyles.userInfoContainer}>
            <View style={LandingPageStyles.avatarContainer}>
              <Image
                style={LandingPageStyles.avatarImage}
                source={user?.image ? user.image : require('./../assets/images/avatar.png')}
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
        <View>
          <SearchBar />
        </View>
        <View>
          <CategorySelect
            setCategory={(value: string) => {
              setCategory(value);
            }}
          />
        </View>
      </View>

      {quests.length ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={LandingPageStyles.questSliderContainer}>
            <Text style={[globalStyles?.h2, globalStyles?.font18, globalStyles?.p20]}>
              {t('LANDING.QUESTS_NEARBY')}
            </Text>
            <QuestsCarousel items={quests} />
            <View style={LandingPageStyles.questListContainer}>
              <Text style={[globalStyles?.h2, globalStyles?.font18, globalStyles?.p20, globalStyles?.colorSecondary]}>
                {t('LANDING.QUESTS_OTHER')}
              </Text>
              <QuestList items={quests} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={LandingPageStyles.noQuests}>
          <Text style={[globalStyles?.h2, globalStyles?.font18, globalStyles?.p20, LandingPageStyles.noQuestsFont]}>
            {t('LANDING.NO_QUESTS_AVAILABLE')}
          </Text>
          <Text style={[globalStyles?.lightText, globalStyles?.font14, LandingPageStyles.noQuestsP]}>
            {t('LANDING.NO_QUESTS_TRY_DIFFERENT')}
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
    paddingBottom: 20,
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
