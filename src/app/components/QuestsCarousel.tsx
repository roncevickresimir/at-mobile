import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PagerView from 'react-native-pager-view';

import { IQuest } from '~interfaces';

import { QuestItem } from './QuestItem';

interface IQuestCarouselProps {
  items: IQuest[];
}

export const QuestsCarousel = (props: IQuestCarouselProps) => {
  const { items } = props;
  const [quests, setQuests] = useState<IQuest[]>([]);
  const pagerViewRef = useRef();

  useEffect(() => {
    setQuests(items?.length ? [items[items.length - 1], ...items, items[0]] : []);
  }, [props]);

  return (
    <PagerView
      key={quests.length}
      style={QuestsCarouselStyles.carouselContainer}
      initialPage={0}
      overdrag={true}
      overScrollMode={'always'}
    >
      {quests.map((quest, index) => (
        <View style={QuestsCarouselStyles.carouselItem} key={index} collapsable={false}>
          <QuestItem quest={quest} carousel={true} />
        </View>
      ))}
    </PagerView>
  );
};

const QuestsCarouselStyles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    display: 'flex',
    width: '100%',
    overflow: 'visible',
    marginTop: -5,
    marginBottom: 15,
    height: 450,
  },
  carouselItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
