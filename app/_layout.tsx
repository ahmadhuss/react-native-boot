import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Shopping list" }}></Stack.Screen>
      <Stack.Screen
        name="counter"
        options={{
          title: "Counter",
          presentation: "modal",
          animation: "slide_from_bottom"
        }}
      ></Stack.Screen>
      <Stack.Screen name="idea" options={{ title: "Idea" }}></Stack.Screen>
    </Stack>
  );
}
