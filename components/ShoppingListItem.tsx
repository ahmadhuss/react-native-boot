import { View, Text, TouchableOpacity, Alert, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import { theme } from "@/theme";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export default function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete
}: Props) {
  const handleDelete = (name: string) => {
    Alert.alert(`Are you sure you want to delete ${name}?`, "It will be gone for good.", [
      {
        text: "Yes",
        onPress: () => onDelete(),
        style: "destructive"
      },
      {
        text: "Cancel",
        onPress: () => console.log("Not deleted"),
        style: "cancel"
      }
    ]);
  };
  return (
    <Pressable
      style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined]}
      onPress={onToggleComplete}
    >
      {/* Item Text */}
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          style={[styles.itemText, isCompleted ? styles.completedText : undefined]}
          numberOfLines={1} // Truncate the text
        >
          {name}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity onPress={() => handleDelete(name)} activeOpacity={0.8}>
        <AntDesign
          name="close-circle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
    flex: 1 // fill all the available space
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey
  },
  row: {
    flexDirection: "row", // If you use flex-direction:row then you can add gap property
    gap: 8,
    flex: 1 // fill all the available space
  }
});
