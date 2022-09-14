import { View, Text } from "react-native";

const AdditionalInfoPage = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20,
      }}
    >
      <View style={{ backgroundColor: "blue", flex: 0.3 }} />
      <View style={{ backgroundColor: "red", flex: 0.5 }} />
      <Text>Additional Info page</Text>
    </View>
  );
};

export default AdditionalInfoPage;
