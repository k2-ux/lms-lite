import { useCourseStore } from "@/store/course.store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
interface Props {
  title: string;
  description: string;
  course: any;
  instructor?: any;
}

function CourseCard({ title, description, course, instructor }: Props) {
  const { bookmarks, toggleBookmark } = useCourseStore();

  const isBookmarked = bookmarks.some((c) => c.id === course.id);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/courses/[id]",
          params: {
            id: course.id,
            course: JSON.stringify(course),
          },
        })
      }
      className="bg-white rounded-xl shadow mb-4 border border-gray-200 overflow-hidden"
    >
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <Text className="text-lg font-semibold flex-1 pr-2">{title}</Text>

          <Pressable onPress={() => toggleBookmark(course)}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={22}
              color="#2563eb"
            />
          </Pressable>
        </View>

        <Text className="text-gray-600 mt-1" numberOfLines={2}>
          {description}
        </Text>

        <Text className="text-sm text-gray-500 mt-2">
          Instructor: {course?.instructor?.firstName}{" "}
          {course?.instructor?.lastName}
        </Text>
      </View>
    </Pressable>
  );
}
export default React.memo(CourseCard);
