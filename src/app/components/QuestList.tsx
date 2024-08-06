import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import IQuest from '../interfaces/IQuest';
import QuestItem from './QuestItem';

interface IQuestListProps {
  items: IQuest[];
}

export const QuestList = (props: IQuestListProps) => {
  const { items } = props;

  return (
    <View style={QuestListStyles.view}>
      <View style={QuestListStyles.flex}>
        {items.map((quest: IQuest, index: number) => {
          return <QuestItem quest={quest} key={index} />;
        })}
      </View>
    </View>
  );
};

const QuestListStyles = StyleSheet.create({
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
