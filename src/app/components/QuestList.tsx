import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IQuest } from '~interfaces';

import { QuestItem } from './QuestItem';

interface IQuestListProps {
  items: IQuest[];
}

const QuestList = (props: IQuestListProps) => {
  const { items } = props;
  const [quests, setQuests] = useState<IQuest[]>([]);

  useEffect(() => {
    setQuests(props.items);
  }, [props]);

  return (
    <View style={QuestListStyles.view}>
      <View style={QuestListStyles.flex}>
        {quests.map((quest: IQuest, index: number) => (
          <View key={index}>
            <QuestItem quest={quest} />
          </View>
        ))}
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

export { QuestList };
