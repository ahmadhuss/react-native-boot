import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import type { Href } from "expo-router";

import { theme } from "@/theme";

import ShoppingListItem from "@/components/ShoppingListItem";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link
        href={"/counter" as Href}
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to the counter
      </Link>
      <ShoppingListItem name="Coffee" isCompleted={false} />
      <ShoppingListItem name="Tea" isCompleted />
      <ShoppingListItem name="Sugar" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center"
  }
});
