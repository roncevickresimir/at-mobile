import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';



import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';



import { IQuest } from '~interfaces';
import { globalStyles } from '~styles';



import { QuestUsers } from './QuestUsers';
import PATHS from '.PATHS';


interface IQuestItemProps {
  quest: IQuest;
  carousel?: boolean;
}

export const QuestItem = (props: IQuestItemProps) => {
  const { quest, carousel } = props;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(PATHS.QUEST_PAGE.key as never, quest as never);
  };

  return (
    <TouchableWithoutFeedback
      key={quest.name}
      onPress={handlePress}
      style={carousel ? QuestItemCarouselStyles.touchable : QuestItemStyles.touchable}
    >
      <View style={carousel ? QuestItemCarouselStyles.questContainer : QuestItemStyles.questContainer}>
        <View style={carousel ? QuestItemCarouselStyles.ratingContainer : QuestItemStyles.ratingContainer}>
          <Image
            style={carousel ? QuestItemCarouselStyles.ratingImage : QuestItemStyles.ratingImage}
            source={require('./../assets/images/star.png')}
          ></Image>
          <Text style={[globalStyles?.normalText, !carousel && QuestItemStyles.text]}>4.7</Text>
        </View>
        <View style={carousel ? QuestItemCarouselStyles.questImageContainer : QuestItemStyles.questImageContainer}>
          <Image
            style={carousel ? QuestItemCarouselStyles.questImage : QuestItemStyles.questImage}
            source={{ uri: quest.image }}
          ></Image>
        </View>
        <View style={carousel ? QuestItemCarouselStyles.textContainer : QuestItemStyles.textContainer}>
          <View style={carousel ? QuestItemCarouselStyles.questInfoContainer : QuestItemStyles.questInfoContainer}>
            <Text
              style={[
                globalStyles?.normalText,
                globalStyles?.mb2,
                !carousel && QuestItemStyles.text,
                !carousel && QuestItemStyles.textWhite,
              ]}
            >
              {quest.name}
            </Text>
            <Text style={[globalStyles?.lightText, !carousel && QuestItemStyles.text]}>
              {quest.stations?.length}
              {` `}
              {t('LANDING.DESTINATIONS')}
            </Text>
          </View>
          <View style={carousel ? QuestItemCarouselStyles.distanceContainer : QuestItemStyles.distanceContainer}>
            <Text
              style={[
                globalStyles?.normalText,
                !carousel && QuestItemStyles.text,
                !carousel && QuestItemStyles.textWhite,
              ]}
            >
              {quest.distance ?? ''}
            </Text>
          </View>
        </View>
        <QuestUsers number={0} carousel={carousel} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const QuestItemCarouselStyles = StyleSheet.create({
  touchable: {
    display: 'flex',
    padding: 0,
    width: 283,
    height: 427,
    borderRadius: 20,
  },
  questContainer: {
    display: 'flex',
    padding: 10,
    width: 283,
    height: 427,
    backgroundColor: 'white',

    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 20,
  },
  questImageContainer: {
    width: '100%',
    height: 289,
  },
  questImage: {
    width: '100%',
    height: 289,
    borderRadius: 14,
  },
  questInfoContainer: {
    display: 'flex',
    width: '75%',
    paddingHorizontal: 10,
    marginTop: 18,
  },
  ratingContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    width: 62,
    height: 30,
    marginTop: 10,
    marginBottom: -40,
    marginLeft: 190,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingImage: {
    marginRight: 6,
    marginTop: -2,
  },
  distanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '20%',
    marginTop: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceImage: {
    marginRight: 6,
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
});
const QuestItemStyles = StyleSheet.create({
  touchable: {
    display: 'flex',
    padding: 0,
    width: 183,
    height: 260,
    borderRadius: 20,
    marginTop: 10,
  },
  questContainer: {
    display: 'flex',
    padding: 6,
    width: 183,
    height: 260,
    backgroundColor: globalStyles?.colorSecondary.color,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 10,
    marginTop: 10,
  },
  questImageContainer: {
    width: '100%',
    height: 160,
    borderRadius: 20,
  },
  questImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  questInfoContainer: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 5,
    marginTop: 12,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    borderRadius: 20,
    width: 62,
    height: 30,
    marginTop: 5,
    marginBottom: -35,
    marginLeft: 105,
    zIndex: 5,
  },
  ratingImage: {
    marginRight: 6,
    marginTop: -2,
  },
  distanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '20%',
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceImage: {
    marginRight: 6,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  textWhite: {
    color: 'white',
  },
});