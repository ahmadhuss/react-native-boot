import { Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/theme";

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => {
            return (
              <Link href="/counter/history" asChild={true}>
                <Pressable hitSlop={20}>
                  <MaterialIcons name="history" size={32} color={theme.colorGrey} />
                </Pressable>
              </Link>
            );
          }
        }}
      ></Stack.Screen>
    </Stack>
  );
}
