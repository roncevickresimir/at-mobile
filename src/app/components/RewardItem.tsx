import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import globalStyles from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import PATHS from "../../paths";
import IReward from "../interfaces/IReward";

interface IRewardItemProps {
  reward: IReward;
}

const RewardItem = (props: IRewardItemProps) => {
  const { reward } = props;

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(PATHS.REWARDS_PAGE.key as never, reward as never);
  };

  return (
    <TouchableWithoutFeedback
      key={reward.name}
      onPress={handlePress}
      style={RewardItemStyles.touchable}
    >
      <View style={RewardItemStyles.rewardContainer}>
        <View style={RewardItemStyles.rewardImageContainer}>
          {reward.image ? (
            <Image
              style={RewardItemStyles.rewardImage}
              source={{ uri: reward.image }}
            />
          ) : (
            <Image
              style={RewardItemStyles.rewardNoImage}
              source={require("./../assets/images/reward.png")}
            />
          )}
        </View>
        <View style={[RewardItemStyles.textContainer, globalStyles.flexCenter]}>
          <Text
            style={[
              globalStyles.normalText,
              globalStyles.mb2,
              RewardItemStyles.text,
            ]}
          >
            {reward.name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const RewardItemCarouselStyles = StyleSheet.create({
  touchable: {
    display: "flex",
    padding: 0,
    width: 236,
    height: 356,
    borderRadius: 20,
  },
  rewardContainer: {
    display: "flex",
    padding: 10,
    width: 236,
    height: 356,
    backgroundColor: "white",

    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 20,
  },
  rewardImageContainer: {
    width: "100%",
    height: 241,
  },
  rewardImage: {
    width: "100%",
    height: 241,
    borderRadius: 14,
  },
  rewardInfoContainer: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    width: "20%",
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingImage: {
    marginRight: 6,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
const RewardItemStyles = StyleSheet.create({
  touchable: {
    display: "flex",
    padding: 0,
    width: 183,
    height: 260,
    borderRadius: 20,
    marginTop: 10,
  },
  rewardContainer: {
    display: "flex",
    padding: 6,
    paddingVertical: 12,
    width: "45%",
    maxWidth: 170,
    backgroundColor: globalStyles.colorGrey.color,
    borderRadius: 20,
    justifyContent: "center",
  },
  rewardImageContainer: {
    width: "100%",
    borderRadius: 100,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rewardImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  rewardNoImage: {
    width: 50,
    height: 50,
    borderRadius: 16,
    resizeMode: "contain",
  },
  rewardInfoContainer: {
    display: "flex",
    width: "75%",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    width: "20%",
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingImage: {
    marginRight: 6,
  },
  textContainer: {
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    color: globalStyles.colorSecondary.color,
    fontWeight: "bold",
    textAlign: "center",
  },
  textWhite: {
    color: "white",
  },
});

export default RewardItem;
