import AppHeader from "@/components/AppHeader";
import CourseCard from "@/components/CourseCard";
import { useCourseStore } from "@/store/course.store";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

export default function BookmarksScreen() {
  const { bookmarks, loadBookmarks } = useCourseStore();

  useEffect(() => {
    loadBookmarks();
  }, []);

  if (!bookmarks.length) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">No bookmarked courses yet</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Bookmarks" showBack />

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            course={item}
          />
        )}
      />
    </View>
  );
}
