import { t } from "i18next";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import {
  ICompleteStationPayload,
  IGetStationPayload,
  useLazyCompleteStationQuery,
  useLazyGetStationQuery,
} from "../../services/stationService";
import { useAppSelector } from "../../utils/hooks";
import IStation from "../interfaces/IStation";
import QRScanner from "../components/QRScanner";

const StationPage = (props: any) => {
  const [station, setStation] = useState<IStation | null>();
  const [stationComplete, setStationComplete] = useState<boolean>(
    props?.route?.params?.complete
  );

  const navigation = useNavigation();
  const googleMapOpenUrl = ({ latitude, longitude }) => {
    const latLng = `${latitude},${longitude}`;
    return `google.navigation:q=${latLng}`;
  };

  const [
    getStation,
    { isLoading: stationLoading, isUninitialized: stationUninitialized },
  ] = useLazyGetStationQuery();

  const [getStationPayload, setGetStationPayload] =
    useState<IGetStationPayload>({
      id: props.route.params.id,
    });

  const fetchData = async () => {
    const getStationResponse = await getStation(getStationPayload).unwrap();
    setStation(getStationResponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={StationPageStyles.backContainer}
        onPress={() => {
          navigation.goBack(null);
        }}
      >
        <Image
          style={StationPageStyles.back}
          source={require("./../assets/images/back.png")}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={StationPageStyles.view}>
          <View style={StationPageStyles.header}>
            <Image
              style={StationPageStyles.image}
              source={{ uri: station?.image }}
            />
          </View>

          <View style={StationPageStyles.about}>
            <View style={StationPageStyles.row}>
              <Text
                style={[
                  globalStyles.bold,
                  globalStyles.colorWhite,
                  globalStyles.h1,
                ]}
              >
                {station?.name}
              </Text>
              <View style={StationPageStyles.ratingContainer}>
                <Image
                  style={StationPageStyles.ratingImage}
                  source={require("./../assets/images/star.png")}
                ></Image>
                <Text
                  style={[globalStyles.normalText, globalStyles.colorWhite]}
                >
                  4.7
                </Text>
              </View>
            </View>
            <View style={StationPageStyles.row}>
              <Text style={[globalStyles.normalText, globalStyles.colorWhite]}>
                {t("STATION_PAGE.REWARDS_AND_POINTS")}
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={StationPageStyles.rewards}>
                {station?.reward.length ? (
                  station?.reward?.map((reward, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          StationPageStyles.reward,
                          !index && StationPageStyles.firstReward,
                        ]}
                      >
                        {reward.image ? (
                          <Image
                            style={StationPageStyles.rewardWithImage}
                            source={{ uri: reward.image }}
                          ></Image>
                        ) : (
                          <Image
                            style={StationPageStyles.rewardImage}
                            source={require("./../assets/images/reward.png")}
                          ></Image>
                        )}
                        <Text
                          style={[
                            globalStyles.normalText,
                            globalStyles.colorWhite,
                            StationPageStyles.rewardName,
                          ]}
                        >
                          {reward.name}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={[
                      StationPageStyles.reward,
                      StationPageStyles.firstReward,
                    ]}
                  >
                    <Image
                      style={StationPageStyles.rewardImage}
                      source={require("./../assets/images/reward.png")}
                    ></Image>
                    <Text
                      style={[
                        globalStyles.normalText,
                        globalStyles.colorWhite,
                        StationPageStyles.rewardName,
                      ]}
                    >
                      {t("STATION_PAGE.NO_REWARDS")}
                    </Text>
                  </View>
                )}
                <View style={StationPageStyles.reward}>
                  <Image
                    style={StationPageStyles.coinImage}
                    source={require("./../assets/images/coin.png")}
                  ></Image>
                  <Text
                    style={[
                      globalStyles.normalText,
                      globalStyles.colorWhite,
                      StationPageStyles.coinName,
                    ]}
                  >
                    {station?.reward.length * 21} points
                  </Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={StationPageStyles.mapsContainer}
              onPress={() => {
                Linking.openURL(
                  googleMapOpenUrl({
                    latitude: station?.location?.lat,
                    longitude: station?.location?.lng,
                  })
                );
              }}
            >
              <Image
                style={StationPageStyles.mapsImage}
                source={require("./../assets/images/gps.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={StationPageStyles.content}>
            <Text style={[globalStyles.lightText]}>
              {`${station?.description?.slice(0, 500)}${
                station?.description?.length > 500 ? "..." : ""
              }`}
            </Text>

            <View style={StationPageStyles.mapContainer}>
              <MapView
                style={StationPageStyles.map}
                showsUserLocation
                region={{
                  latitude: station?.location?.lat || 0,
                  longitude: station?.location?.lng || 0,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: station?.location?.lat || 0,
                    longitude: station?.location?.lng || 0,
                  }}
                />
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>
      {!stationComplete ? (
        <QRScanner stationId={station?.id} />
      ) : (
        <View style={StationPageStyles.completeContainer}>
          <Text
            style={[
              globalStyles.h2,
              globalStyles.bold,
              globalStyles.colorWhite,
            ]}
          >
            {t("STATION_PAGE.STATION_COMPLETE")}
          </Text>
        </View>
      )}
    </View>
  );
};

const StationPageStyles = StyleSheet.create({
  view: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    paddingBottom: 70,
    backgroundColor: "white",
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
  completeContainer: {
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 25,
    display: "flex",
    alignItems: "center",
    backgroundColor: globalStyles.colorPrimary.color,
  },
  complete: {
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
    overflow: "visible",
  },
  mapsContainer: {
    position: "absolute",
    top: -25,
    right: 30,
    backgroundColor: globalStyles.colorPrimary.color,
    borderRadius: 50,
    padding: 17,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mapsImage: {
    width: 26,
    height: 26,
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
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: 200,
  },
});

export default StationPage;
