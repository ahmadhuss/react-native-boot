import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { theme } from "@/theme";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarInactiveTintColor: theme.colorCerulean }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping list",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" color={color} size={size} />
          )
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="counter"
        options={{
          title: "Counter",
          headerShown: false, // This screen has nested Stack we have to only show single header
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clock-circle" size={size} color={color} />
          )
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="idea"
        options={{
          title: "Idea",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="lightbulb" size={size} color={color} />
          )
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
