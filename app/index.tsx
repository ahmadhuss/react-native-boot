import { useState } from "react";
import { View, ScrollView, StyleSheet, TextInput } from "react-native";

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

export default function Index() {
  const [value, setValue] = useState<string>("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>(initialList);

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
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

      {shoppingList.map((item: ShoppingListItemType) => {
        return <ShoppingListItem key={item.id} name={item.name} />;
      })}
    </ScrollView>
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
  }
});
