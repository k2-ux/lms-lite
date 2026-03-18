import * as Notifications from "expo-notifications";

export async function requestNotificationPermission() {
  await Notifications.requestPermissionsAsync();
}

export async function sendBookmarkNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Great learning progress!",
      body: "You have bookmarked 5 courses. Keep learning 🎓",
    },
    trigger: null,
  });
}

export async function scheduleReminder() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Continue your learning",
      body: "🫵🏻You haven't opened the LMS app recently. Resume your courses!",
    },
    trigger: {
      seconds: 86400,
      repeats: false,
      channelId: "reminders",
    },
  });
}
