import { View, StyleSheet } from "react-native";

import { theme } from "@/theme";

import ShoppingListItem from "@/components/ShoppingListItem";

export default function Index() {
  return (
    <View style={styles.container}>
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
