import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "@/theme";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function Counter() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I am a notification from your app"
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
          repeats: false
        }
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Unable to schedule notification",
          "Enable the notification permission for Expo Go in settings"
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1
  }
});
