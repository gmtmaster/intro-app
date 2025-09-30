import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Üdv az Intro Appban 🎉</Text>
            <Button title="Tovább a fő apphoz" onPress={() => router.replace("/(tabs)")} />
        </View>
    );
}
