import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

import { RewardList } from '~components';
import { IReward } from '~interfaces';
import { useLazyGetRewardsByUserIdQuery } from '~services';
import { globalStyles } from '~styles';
import { useAppSelector } from '~utils';

export const RewardsPage = () => {
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [points, setPoints] = useState<number>(0);
  const navigation = useNavigation();

  const user = useAppSelector((state) => state?.auth?.user);

  const [getRewards, { isLoading: isRewardsLoading }] = useLazyGetRewardsByUserIdQuery();

  const fetchData = async () => {
    if (!user) return;
    setRewards([...(await getRewards(user.id).unwrap())]);
  };

  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  useEffect(() => {
    setPoints(rewards?.length * 21 || 0);
  }, [rewards]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={RewardsPageStyles.backContainer}
        onPress={() => {
          navigation.goBack(null);
        }}
      >
        <Image style={RewardsPageStyles.back} source={require('./../assets/images/back.png')} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={RewardsPageStyles.view}>
          <View style={RewardsPageStyles.header}>
            <View style={RewardsPageStyles.about}>
              <View style={RewardsPageStyles.row}>
                <Text
                  style={[
                    globalStyles?.bold,
                    globalStyles?.colorWhite,
                    globalStyles?.h1,
                    globalStyles?.w100,
                    globalStyles?.flexCenter,
                    RewardsPageStyles.h1,
                  ]}
                >
                  {t('REWARDS.HEADER')}
                </Text>
                <Image style={RewardsPageStyles.circleOne} source={require('./../assets/images/circlePrimary.png')} />
                <Image style={RewardsPageStyles.circleTwo} source={require('./../assets/images/circlePrimary.png')} />
              </View>
              <View style={RewardsPageStyles.row}>
                <Image style={RewardsPageStyles.coinImage} source={require('./../assets/images/coin.png')}></Image>
                <Text
                  style={[
                    globalStyles?.bold,
                    globalStyles?.colorWhite,
                    globalStyles?.flexCenter,
                    RewardsPageStyles.points,
                  ]}
                >
                  {points}
                </Text>
              </View>
              {/*
              <View style={RewardsPageStyles.row}>
                <Text
                  style={[
                    globalStyles?.normalText,
                    globalStyles?.colorWhite,
                    globalStyles?.flexCenter,
                    globalStyles?.w100,
                  ]}
                >
                  {t("REWARDS.YOUR_POINTS")}
                </Text>
              </View>
                */}
            </View>

            <View style={RewardsPageStyles.content}>
              <RewardList items={rewards} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const RewardsPageStyles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingBottom: 70,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 300,
  },
  h1: {
    marginTop: 45,
    marginBottom: 40,
  },
  coinImage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  points: {
    fontSize: 50,
  },

  circleOne: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: 55,
    left: -70,
  },
  circleTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    top: 120,
    right: -100,
  },

  backContainer: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 9,
  },
  back: {
    width: 35,
    height: 35,
  },
  completeContainer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 25,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: globalStyles?.colorPrimary.color,
  },
  complete: {
    width: 35,
    height: 35,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  about: {
    backgroundColor: globalStyles?.colorSecondary.color,
    paddingTop: 50,
    paddingBottom: 70,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    overflow: 'visible',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
    width: '100%',
  },
  content: {
    backgroundColor: globalStyles?.colorWhite.color,
    minHeight: '100%',
    paddingVertical: 30,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
  },
});
