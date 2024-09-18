import { StyleSheet, Text, View } from 'react-native';

import { t } from 'i18next';

import { IReward } from '~interfaces';
import { globalStyles } from '~styles';

import { RewardItem } from './RewardItem';

interface IRewardListProps {
  items: IReward[];
}
export const RewardList = (props: IRewardListProps) => {
  const { items } = props;

  return (
    <View style={RewardListStyles.view}>
      <View style={RewardListStyles.flex}>
        {items.length ? (
          items.map((reward: IReward, index: number) => {
            return <RewardItem reward={reward} key={index} />;
          })
        ) : (
          <>
            <Text style={[globalStyles.bold, globalStyles.h2, globalStyles.mt32, globalStyles.colorSecondary]}>
              {t('REWARDS_PAGE.NO_REWARDS')}
            </Text>
            <Text style={[globalStyles.bold, globalStyles.lightText, globalStyles.p20, globalStyles.colorSecondary]}>
              {t('REWARDS_PAGE.GUIDE')}
            </Text>
          </>
        )}
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
