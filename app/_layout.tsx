import OfflineBanner from "@/components/OfflineBanner";
import { useAuthStore } from "@/store/auth.store";
import { useCourseStore } from "@/store/course.store";
import {
  requestNotificationPermission,
  scheduleReminder,
} from "@/utils/notifications";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    requestNotificationPermission();
    scheduleReminder();
  }, []);
  const { loadToken } = useAuthStore();
  const { loadBookmarks, loadEnrollment } = useCourseStore();
  useEffect(() => {
    const init = async () => {
      await loadToken();
      await loadBookmarks();
      await loadEnrollment();
    };

    init();
  }, []);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowList: true,
    }),
  });
  return (
    <>
      <OfflineBanner />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
