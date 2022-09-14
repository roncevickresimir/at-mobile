import { t } from "i18next";
import React, { ReactElement, useEffect, useState } from "react";
import QuestUsers from "./../components/QuestUsers";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import PATHS from "../../paths";
import { useLazyGetQuestByIdQuery } from "../../services/questService";
import { useAppSelector } from "../../utils/hooks";
import IQuest, { ILocation } from "../interfaces/IQuest";
import IReward from "../interfaces/IReward";
import IStation from "../interfaces/IStation";

const QuestPage = (props: any) => {
  const [quest, setQuest] = useState<IQuest>();
  const [rewards, setRewards] = useState<IReward[]>([]);

  const user = useAppSelector((state) => state?.auth?.user?.User);
  const navigation = useNavigation();
  const [
    getQuest,
    { isLoading: getQuestLoading, isUninitialized: getQuestUninitialized },
  ] = useLazyGetQuestByIdQuery();

  const fetchData = async () => {
    const getQuestResponse = await getQuest({
      questId: props.route.params.id,
      userId: user.id,
    }).unwrap();
    setQuest(getQuestResponse);

    let rewardsArray: IReward[] = [];
    getQuestResponse.stations.forEach((station: any) => {
      station?.reward?.forEach((r: IReward) => {
        rewardsArray.push(r);
      });
    });
    setRewards(rewardsArray);
  };

  const googleMapOpenUrl = ({ lat, lng }: ILocation) => {
    const latLng = `${lat},${lng}`;
    return `google.navigation:q=${latLng}`;
  };

  const handlePress = (station: IStation) => {
    navigation.navigate(PATHS.STATION_PAGE.key as never, station as never);
  };

  useEffect(() => {
    fetchData();

    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={QuestPageStyles.backContainer}
        onPress={() => {
          navigation.goBack(null);
        }}
      >
        <Image
          style={QuestPageStyles.back}
          source={require("./../assets/images/back.png")}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={QuestPageStyles.view}>
          <View style={QuestPageStyles.header}>
            <Image
              style={QuestPageStyles.image}
              source={{ uri: quest?.image }}
            />
          </View>

          <View style={QuestPageStyles.about}>
            <View style={QuestPageStyles.row}>
              <Text
                style={[
                  globalStyles.bold,
                  globalStyles.colorWhite,
                  globalStyles.h1,
                ]}
              >
                {quest?.name}
              </Text>
              <View style={QuestPageStyles.ratingContainer}>
                <Image
                  style={QuestPageStyles.ratingImage}
                  source={require("./../assets/images/star.png")}
                ></Image>
                <Text
                  style={[globalStyles.normalText, globalStyles.colorWhite]}
                >
                  4.7
                </Text>
              </View>
            </View>

            <View style={QuestPageStyles.row}>
              <Text style={[globalStyles.normalText, globalStyles.colorWhite]}>
                {t("QUEST_PAGE.REWARDS_AND_POINTS")}
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={QuestPageStyles.rewards}>
                {rewards.length ? (
                  rewards?.map((reward, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          QuestPageStyles.reward,
                          !index && QuestPageStyles.firstReward,
                        ]}
                      >
                        {reward.image ? (
                          <Image
                            style={QuestPageStyles.rewardWithImage}
                            source={{ uri: reward.image }}
                          ></Image>
                        ) : (
                          <Image
                            style={QuestPageStyles.rewardImage}
                            source={require("./../assets/images/reward.png")}
                          ></Image>
                        )}
                        <Text
                          style={[
                            globalStyles.normalText,
                            globalStyles.colorWhite,
                            QuestPageStyles.rewardName,
                          ]}
                        >
                          {reward.name}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={[
                      globalStyles.normalText,
                      globalStyles.colorWhite,
                      QuestPageStyles.rewardName,
                    ]}
                  >
                    {t("STATION_PAGE.NO_REWARDS")}
                  </Text>
                )}
                <View style={QuestPageStyles.reward}>
                  <Image
                    style={QuestPageStyles.coinImage}
                    source={require("./../assets/images/coin.png")}
                  ></Image>
                  <Text
                    style={[
                      globalStyles.normalText,
                      globalStyles.colorWhite,
                      QuestPageStyles.coinName,
                    ]}
                  >
                    {rewards.length * 21} points
                  </Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={QuestPageStyles.mapsContainer}
              onPress={() => {
                Linking.openURL(
                  googleMapOpenUrl({
                    lat: quest?.location?.lat,
                    lng: quest?.location?.lng,
                  })
                );
              }}
            >
              <Image
                style={QuestPageStyles.mapsImage}
                source={require("./../assets/images/location.png")}
              />
              <Text
                style={[
                  globalStyles.normalText,
                  globalStyles.colorWhite,
                  globalStyles.font14,
                ]}
              >
                {quest?.locationName ? quest.locationName : "Take me there"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={QuestPageStyles.content}>
            <Text style={[globalStyles.lightText]}>
              {`${quest?.description.slice(0, 250)}${
                quest?.description?.length
                  ? quest?.description?.length > 250 && "..."
                  : ""
              }`}
            </Text>
            <View style={QuestPageStyles.users}>
              <QuestUsers number={quest?.users} big={true} />
            </View>
            <Text style={[globalStyles.normalText]}>
              {t("QUEST_PAGE.DESTINATIONS")}
            </Text>
            <View style={QuestPageStyles.stationContainer}>
              {quest?.stations.map((station: any, index: number) => {
                const complete = station?.complete;
                let image: ReactElement = <></>;
                if (!complete) {
                  image = (
                    <Image
                      style={QuestPageStyles.stationStatus}
                      source={require("./../assets/images/stationIncomplete.png")}
                    />
                  );
                } else {
                  image = (
                    <Image
                      style={QuestPageStyles.stationStatus}
                      source={require("./../assets/images/stationComplete.png")}
                    />
                  );
                }
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => handlePress(station)}
                  >
                    <View style={QuestPageStyles.station}>
                      {image}
                      <View style={QuestPageStyles.stationText}>
                        <Text style={[globalStyles.normalText]}>
                          {station?.name}
                        </Text>
                        <Text style={[globalStyles.lightText]}>
                          {station?.description.slice(0, 25) + "..."}
                        </Text>
                      </View>
                      <Image
                        style={QuestPageStyles.stationArrow}
                        source={require("./../assets/images/arrow.png")}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const QuestPageStyles = StyleSheet.create({
  view: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    height: 300,
  },
  backContainer: {
    position: "absolute",
    top: 50,
    left: 25,
    zIndex: 9,
  },
  back: {
    width: 35,
    height: 35,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  about: {
    backgroundColor: globalStyles.colorSecondary.color,
    paddingTop: 50,
    paddingBottom: 70,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
  },
  mapsContainer: {
    position: "absolute",
    top: -25,
    right: 30,
    backgroundColor: globalStyles.colorPrimary.color,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mapsImage: {
    width: 13,
    height: 15,
    marginRight: 6,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
  },
  ratingImage: {
    marginRight: 6,
  },
  content: {
    backgroundColor: globalStyles.colorWhite.color,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
  },
  users: {
    width: "100%",
    marginTop: 15,
    marginBottom: 20,
    marginLeft: -8,
  },
  stationContainer: {
    marginVertical: 20,
  },
  station: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 30,
  },
  stationStatus: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  stationText: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  stationArrow: {
    width: 35,
    height: 20,
  },

  rewards: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  reward: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
  },
  firstReward: {
    marginLeft: 35,
  },
  rewardImage: {
    width: 40,
    height: 40,
    marginRight: 5,
    marginTop: 0,
  },
  rewardWithImage: {
    width: 40,
    height: 40,
    marginRight: 5,
    marginTop: 8,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: globalStyles.colorPrimary.color,
    borderWidth: 2,
  },
  rewardName: {
    marginRight: 5,
    marginTop: 8,
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 5,
  },
  coinName: {
    marginTop: 5,
  },
});

export default QuestPage;
