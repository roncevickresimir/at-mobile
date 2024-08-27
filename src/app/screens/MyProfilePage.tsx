import React, { useState } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

import { logout } from '~slices';
import { globalStyles } from '~styles';
import { useAppSelector } from '~utils';

export const MyProfilePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.auth.user);

  interface ILink {
    name: string;
    source: ImageSourcePropType;
    action: () => void;
  }

  const links: ILink[] = [
    {
      name: 'ACCOUNT_SETTINGS',
      source: require('./../assets/images/myProfile/ACCOUNT_SETTINGS.png'),
      action: () => {
        console.log('click');
      },
    },
    {
      name: 'NOTIFICATIONS',
      source: require('./../assets/images/myProfile/NOTIFICATIONS.png'),
      action: () => {
        console.log('click');
      },
    },
    {
      name: 'PASSWORD',
      source: require('./../assets/images/myProfile/PASSWORD.png'),
      action: () => {
        console.log('click');
      },
    },
    {
      name: 'LANGUAGE',
      source: require('./../assets/images/myProfile/LANGUAGE.png'),
      action: () => {
        console.log('click');
      },
    },
    {
      name: 'TERMS',
      source: require('./../assets/images/myProfile/TERMS.png'),
      action: () => {
        console.log('click');
      },
    },
    {
      name: 'PRIVACY',
      source: require('./../assets/images/myProfile/PRIVACY.png'),
      action: () => {
        console.log('click');
      },
    },
    {
      name: 'LOGOUT',
      source: require('./../assets/images/myProfile/LOGOUT.png'),
      action: () => {
        dispatch(logout());
      },
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity
        style={RewardsPageStyles.backContainer}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={RewardsPageStyles.back} source={require('./../assets/images/back.png')} />
      </TouchableOpacity>

      <View style={RewardsPageStyles.header}>
        <View style={RewardsPageStyles.row}>
          <Text
            style={[
              globalStyles?.bold,
              globalStyles?.h1,
              globalStyles?.w100,
              globalStyles?.flexCenter,
              RewardsPageStyles.h1,
            ]}
          >
            {t('MY_PROFILE.HEADER')}
          </Text>
        </View>
        <View style={[RewardsPageStyles.row, globalStyles?.flexCenter, RewardsPageStyles.user]}>
          <Image
            style={RewardsPageStyles.avatar}
            source={/*user?.image ? user.image :*/ require('./../assets/images/avatar.png')}
          ></Image>
          <Text style={[globalStyles?.normalText, globalStyles?.font18]}>{user?.username}</Text>
          <Text style={globalStyles?.lightText}>{user?.email}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={RewardsPageStyles.view}>
          <View style={RewardsPageStyles.content}>
            <View style={RewardsPageStyles.about}>
              <View style={[RewardsPageStyles.row, globalStyles?.flexCenter, RewardsPageStyles.stats]}>
                <View style={[RewardsPageStyles.row, globalStyles?.flexCenter, RewardsPageStyles.stat]}></View>
                <View style={[RewardsPageStyles.row, globalStyles?.flexCenter, RewardsPageStyles.stat]}></View>
                <View style={[RewardsPageStyles.row, globalStyles?.flexCenter, RewardsPageStyles.stat]}></View>
              </View>

              {links.map((link: ILink, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[RewardsPageStyles.link]}
                    onPress={() => {
                      link?.action();
                    }}
                  >
                    <Image style={[RewardsPageStyles.linkImage]} source={link.source}></Image>
                    <View style={[RewardsPageStyles.linkContent]}>
                      <Text style={[globalStyles?.normalText, RewardsPageStyles.linkTitle]}>
                        {t(`MY_PROFILE.${link?.name}.TITLE`)}
                      </Text>
                      <Text style={[globalStyles?.lightText, globalStyles?.font14, RewardsPageStyles.linkDescription]}>
                        {t(`MY_PROFILE.${link?.name}.DESCRIPTION`)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
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
    backgroundColor: 'white',
  },
  h1: {
    marginTop: 45,
    marginBottom: 40,
    color: globalStyles?.colorSecondary.color,
  },
  user: {
    flexDirection: 'column',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  stats: {},
  stat: {},

  link: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: globalStyles?.colorGrey.color,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  linkImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  linkContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  linkTitle: {
    width: '100%',
    marginBottom: 3,
  },
  linkDescription: {
    width: '100%',
    marginTop: 3,
  },

  backContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 9,
  },
  back: {
    width: 35,
    height: 35,
  },

  about: {
    backgroundColor: globalStyles?.colorWhite.color,
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

    paddingHorizontal: 20,
  },
});