import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import { theme } from '../theme';

type Props = {
  name: string;
  isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted }: Props) {
  const handleDelete = (name: string) => {
    Alert.alert(`Are you sure you want to delete ${name}?`, 'It will be gone for good.', [
      {
        text: 'Yes',
        onPress: () => console.log('Deleted'),
        style: 'destructive'
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Not deleted'),
        style: 'cancel'
      }
    ]);
  };
  return (
    <View
      style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined]}
    >
      <Text style={[styles.itemText, isCompleted ? styles.completedText : undefined]}>
        {name}
      </Text>
      <TouchableOpacity
        style={[styles.button, isCompleted ? styles.completedButton : undefined]}
        onPress={() => handleDelete(name)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey
  },
  itemText: {
    fontSize: 18,
    fontWeight: '200'
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6
  },
  completedButton: {
    backgroundColor: theme.colorGrey
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  }
});

export default ShoppingListItem;
