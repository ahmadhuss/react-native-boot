import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, FlatList } from "react-native";

import { theme } from "@/theme";

import ShoppingListItem from "@/components/ShoppingListItem";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Sugar" }
];

const testData = new Array(1000).fill(null).map((_, index) => ({
  id: index.toString(),
  name: `Item ${index}`
}));

export default function Index() {
  const [value, setValue] = useState<string>("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter(item => item.id !== id);
    setShoppingList(newShoppingList);
  };

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: value },
        ...shoppingList
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };

  return (
    <FlatList
      data={shoppingList}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      renderItem={({ item }: { item: ShoppingListItemType }) => {
        console.log(item);
        return (
          <ShoppingListItem name={item.name} onDelete={() => handleDelete(item.id)} />
        );
      }}
      keyExtractor={(item: ShoppingListItemType) => item.id}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your Shopping list is empty.</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.g. Coffee"
          value={value}
          onChangeText={setValue}
          keyboardType="default"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={handleSubmit} // When Done button is pressed this will call
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12
    // justifyContent: "center"
  },
  contentContainer: {
    paddingBottom: 24
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18
  }
});
