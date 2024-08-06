import { t } from 'i18next';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

import IQuest from '../interfaces/IQuest';
import globalStyles from '../styles/globalStyles';
import QuestItem from './QuestItem';

interface IQuestCarouselProps {
  items: IQuest[];
}

export const QuestsCarousel = (props: IQuestCarouselProps) => {
  const { items } = props;
  const [data, setData] = useState<IQuest[]>(items);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    setData(items);
  }, [items]);

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      {/* <Carousel
        style={QuestsCarouselStyles.carouselContainer}
        loop
        width={width}
        height={356}
        autoPlay={false}
        data={data}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 190,
        }}
        autoFillData={true}
        scrollAnimationDuration={300}
        windowSize={width}
        enabled={true}
        renderItem={({ item }) => {
          return (
            <View key={item.name} style={QuestsCarouselStyles.carouselItem}>
              <QuestItem quest={item} key={item.id} carousel />
            </View>
          );
        }}
      /> */}
    </View>
  );
};

const QuestsCarouselStyles = StyleSheet.create({
  view: {
    width: '100%',
  },
  carouselContainer: {
    marginTop: -15,
    width: '100%',
    overflow: 'visible',
  },
  carouselItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
