import AppHeader from "@/components/AppHeader";
import CourseCard from "@/components/CourseCard";
import { getCourses, getInstructors } from "@/services/course.service";
import { LegendList } from "@legendapp/list";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
export default function CoursesScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [error, setError] = useState(false);
  async function loadCourses() {
    try {
      setError(false);

      const courseData = await getCourses();
      const instructorData = await getInstructors();

      const coursesList = courseData?.data?.data || [];
      const instructors = instructorData?.data?.data || [];
      const combined = coursesList.map((course: any, index: number) => ({
        ...course,
        instructor: instructors[index % instructors.length],
      }));
      setCourses(combined);
      setFilteredCourses(combined);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }
  useEffect(() => {
    loadCourses();
  }, []);
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredCourses(filtered);
  }, [searchQuery, courses]);
  function onRefresh() {
    setRefreshing(true);
    loadCourses();
  }
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold mb-4">
          Failed to load courses
        </Text>

        <Pressable
          onPress={loadCourses}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Courses" />
      <TextInput
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="border border-gray-300 p-3 rounded-lg mx-4 mt-4"
        placeholderTextColor={"#555454"}
      />
      <LegendList
        data={filteredCourses}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={120}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            course={item}
          />
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <Text className="text-gray-500">No courses found</Text>
          </View>
        )}
      />
    </View>
  );
}
