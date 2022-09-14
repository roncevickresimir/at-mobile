import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import PATHS from "../../paths";
import globalStyles from "../styles/globalStyles";

interface ITabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar = (props: ITabBarProps) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={TabBarStyles.bar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        let imageSrc = require("./../assets/images/MyProfilePage.png");
        switch (label) {
          case PATHS.LANDING_PAGE.name:
            imageSrc = require("./../assets/images/LandingPage.png");
            break;
          case PATHS.COMPLETED_QUESTS.name:
            imageSrc = require("./../assets/images/CompletedQuestsPage.png");
            break;
          case PATHS.REWARDS_PAGE.name:
            imageSrc = require("./../assets/images/RewardsPage.png");
            break;
          case PATHS.MY_PROFILE.name:
            imageSrc = require("./../assets/images/MyProfilePage.png");
            break;
        }

        return label === "QuestsPage" ? (
          <></>
        ) : (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={TabBarStyles.iconContainer}>
              <Image
                style={
                  isFocused
                    ? [TabBarStyles.icon, TabBarStyles.iconFocus]
                    : TabBarStyles.icon
                }
                source={imageSrc}
              ></Image>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabBarStyles = StyleSheet.create({
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 25,
    left: 10,
    width: Dimensions.get("window").width - 20,
    height: 80,
    backgroundColor: globalStyles.colorPrimary.color,
    borderRadius: 18,

    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 10,
  },
  iconContainer: {
    width: "100%",
    height: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 28, height: 28, opacity: 0.6 },
  iconFocus: { opacity: 1 },
});

export default TabBar;
