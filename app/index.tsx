import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  LayoutAnimation
} from "react-native";

import * as Haptics from "expo-haptics";

import { theme } from "@/theme";

import ShoppingListItem from "@/components/ShoppingListItem";
import { getFromStorage, saveStorage } from "@/utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee", lastUpdatedTimestamp: Date.now() },
  { id: "2", name: "Tea", lastUpdatedTimestamp: Date.now() },
  { id: "3", name: "Sugar", lastUpdatedTimestamp: Date.now() }
];

const testData = new Array(1000).fill(null).map((_, index) => ({
  id: index.toString(),
  name: `Item ${index}`,
  lastUpdatedTimestamp: Date.now()
}));

export default function Index() {
  const [value, setValue] = useState<string>("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await getFromStorage(storageKey);
        if (data) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShoppingList(data);
        }
      } catch (error) {
        console.error("Failed to load shopping list:", error);
      }
    };

    fetchInitial().catch(error => {
      console.error("Error in fetchInitial:", error);
    });
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: value, lastUpdatedTimestamp: Date.now() },
        ...shoppingList
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveStorage(storageKey, newShoppingList);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter(item => item.id !== id);
    saveStorage(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Vibrate
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map(item => {
      if (item.id === id) {
        if (item.completedAtTimestamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Vibrate
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp ? undefined : Date.now()
        };
      }
      return item;
    });
    saveStorage(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  /**
   * Orders the shopping list by completed items first, then by last updated timestamp.
   * @param shoppingList The shopping list to order.
   * @returns The ordered shopping list.
   */
  function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      renderItem={({ item }: { item: ShoppingListItemType }) => {
        console.log(item);
        return (
          <ShoppingListItem
            name={item.name}
            onDelete={() => handleDelete(item.id)}
            onToggleComplete={() => handleToggleComplete(item.id)}
            isCompleted={item.completedAtTimestamp !== undefined}
          />
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
    paddingVertical: 12
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
