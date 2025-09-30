import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* index.tsx lesz a Welcome */}
            <Stack.Screen name="index" />
            {/* (tabs) mappa lesz a fő app tabokkal */}
            <Stack.Screen name="(tabs)" />
            {/* Modal is maradhat, tanulásnak jó */}
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
    );
}
