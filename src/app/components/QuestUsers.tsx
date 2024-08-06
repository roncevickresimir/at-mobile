import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { t } from 'i18next';

import { globalStyles } from '~styles';

interface IQuestUsersProps {
  number: number;
  carousel?: boolean;
  big?: boolean;
}

export const QuestUsers = (props: IQuestUsersProps) => {
  const { number, carousel, big } = props;
  const [minUsers, setMinUsers] = useState<number>(0);
  var [avatarIndexArray, setAvatarIndexArray] = useState<number[]>([]);

  const avatars = [
    <Image
      style={[QuestUsersStyles.avatar, !carousel && QuestUsersStyles.correctAvatar, big && QuestUsersStyles.bigAvatar]}
      source={require('./../assets/images/avatars/1.png')}
    />,
    <Image
      style={[QuestUsersStyles.avatar, !carousel && QuestUsersStyles.correctAvatar, big && QuestUsersStyles.bigAvatar]}
      source={require('./../assets/images/avatars/2.png')}
    />,
    <Image
      style={[QuestUsersStyles.avatar, !carousel && QuestUsersStyles.correctAvatar, big && QuestUsersStyles.bigAvatar]}
      source={require('./../assets/images/avatars/3.png')}
    />,
    <Image
      style={[QuestUsersStyles.avatar, !carousel && QuestUsersStyles.correctAvatar, big && QuestUsersStyles.bigAvatar]}
      source={require('./../assets/images/avatars/4.png')}
    />,
    <Image
      style={[QuestUsersStyles.avatar, !carousel && QuestUsersStyles.correctAvatar, big && QuestUsersStyles.bigAvatar]}
      source={require('./../assets/images/avatars/5.png')}
    />,
    <Image
      style={[QuestUsersStyles.avatar, !carousel && QuestUsersStyles.correctAvatar, big && QuestUsersStyles.bigAvatar]}
      source={require('./../assets/images/avatars/6.png')}
    />,
  ];

  // TODO: Add more images.

  useEffect(() => {
    setMinUsers(Math.floor(Math.random() * 41 + 11));

    let tempAIA = avatarIndexArray;
    while (tempAIA.length < 5) {
      var r = Math.floor(Math.random() * avatars.length);
      if (tempAIA.indexOf(r) === -1) tempAIA.push(r);
    }
    setAvatarIndexArray(tempAIA);
  }, []);

  return (
    <View style={QuestUsersStyles.view}>
      <View style={QuestUsersStyles.users}>
        {avatarIndexArray.map((index) => {
          return <View key={index}>{avatars[index]}</View>;
        })}
      </View>
      <Text
        style={[globalStyles?.lightText, !carousel && QuestUsersStyles.correctText, big && QuestUsersStyles.bigText]}
      >
        {number ? minUsers + number : minUsers} {t('LANDING.AVANTOURISTS')}
      </Text>
    </View>
  );
};

const QuestUsersStyles = StyleSheet.create({
  view: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  users: {
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 16,
  },
  avatar: {
    width: 25,
    height: 25,
    marginRight: -14,
  },
  correctAvatar: {
    width: 20,
    height: 20,
    marginRight: -12,
  },
  correctText: {
    fontSize: 14,
  },
  bigAvatar: {
    width: 40,
    height: 40,
    marginRight: -20,
  },
  bigText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
