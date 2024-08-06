import { t } from 'i18next';
import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import IReward from '../interfaces/IReward';

import RewardItem from './RewardItem';

interface IRewardListProps {
  items: IReward[];
}
export const RewardList = (props: IRewardListProps) => {
  const { items } = props;

  return (
    <View style={RewardListStyles.view}>
      <View style={RewardListStyles.flex}>
        {items.map((reward: IReward, index: number) => {
          return <RewardItem reward={reward} key={index} />;
        })}
      </View>
    </View>
  );
};

const RewardListStyles = StyleSheet.create({
  view: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingBottom: 120,
    borderRadius: 20,
  },
  flex: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
