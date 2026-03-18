import AppHeader from "@/components/AppHeader";
import { useAuthStore } from "@/store/auth.store";
import { useCourseStore } from "@/store/course.store";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
export default function ProfileScreen() {
  const { logout, user } = useAuthStore();
  const { bookmarks, enrolled, completed, cleanEnrollment } = useCourseStore();
  const [avatar, setAvatar] = useState<string | null>(null);
  async function handleLogout() {
    await logout();
    await cleanEnrollment();
    router.replace("/(auth)/login");
  }
  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to access photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }
  const progress = enrolled.length
    ? Math.round((completed.length / enrolled.length) * 100)
    : 0;
  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Profile" showBack />
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="items-center mb-8">
          <Pressable onPress={pickImage} className="items-center mb-6">
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white text-3xl font-bold">
                  {user?.username?.[0] ?? "U"}
                </Text>
              </View>
            )}

            <Text className="text-blue-600 mt-2">Change Profile Picture</Text>
          </Pressable>

          <Text className="text-xl font-semibold">
            {user?.username ?? "User"}
          </Text>

          <Text className="text-gray-500">{user?.email ?? "No email"}</Text>
        </View>

        <View className="bg-gray-100 p-4 rounded-xl mb-6">
          <Text className="text-lg font-semibold mb-3">Learning Stats</Text>

          <Text className="text-gray-700">
            Enrolled Courses: {enrolled.length}
          </Text>

          <Text className="text-gray-700">
            Completed Courses: {completed.length}
          </Text>

          <Text className="text-gray-700">
            Bookmarked Courses: {bookmarks.length}
          </Text>

          <Text className="text-gray-700 mt-2">
            Completion rate: {progress}%
          </Text>
        </View>
        <Pressable onPress={handleLogout} className="bg-red-500 p-4 rounded-lg">
          <Text className="text-white text-center font-semibold">Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
