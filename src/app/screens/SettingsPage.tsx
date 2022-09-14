import { View, Text } from "react-native";



const SettingsPage = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                height: 100,
                padding: 20
            }}
        >
            <View style={{ backgroundColor: "blue", flex: 0.3 }} />
            <View style={{ backgroundColor: "red", flex: 0.5 }} />
            <Text>Settings page</Text>
        </View>
    );
};

export default SettingsPage;