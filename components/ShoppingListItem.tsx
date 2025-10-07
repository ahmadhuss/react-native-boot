import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import { theme } from '../theme';

type Props = {
  name: string;
};

export function ShoppingListItem({ name }: Props) {
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
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{name}</Text>
      <TouchableOpacity
        style={styles.button}
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
  itemText: {
    fontSize: 18,
    fontWeight: '200'
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  }
});

export default ShoppingListItem;
