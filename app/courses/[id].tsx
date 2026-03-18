import AppHeader from "@/components/AppHeader";
import { useCourseStore } from "@/store/course.store";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function CourseDetails() {
  const { id, course } = useLocalSearchParams();

  const parsedCourse = JSON.parse(course as string);

  const courseId = Number(id);

  const { enrolled, completed, toggleEnroll } = useCourseStore();

  const isEnrolled = enrolled.includes(courseId);
  const isCompleted = completed.includes(courseId);

  const buttonLabel = isCompleted
    ? "Review Lesson"
    : isEnrolled
      ? "Continue Lesson"
      : "Start Lesson";

  const buttonColor = isCompleted
    ? "bg-purple-600"
    : isEnrolled
      ? "bg-green-600"
      : "bg-blue-600";

  async function handlePress() {
    if (!isEnrolled && !isCompleted) {
      await toggleEnroll(courseId);
    }

    router.push({
      pathname: "/webview/viewer",
      params: {
        id: courseId,
        title: parsedCourse.title,
        instructor: `${parsedCourse.instructor.name.first} ${parsedCourse.instructor.name.last}`,
        rating: parsedCourse.rating,
        description: parsedCourse.description,
      },
    });
  }

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Course Details" showBack />
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text className="text-2xl font-bold mb-2">{parsedCourse.title}</Text>
        <Text className="text-gray-500 mb-4">
          Category: {parsedCourse.category}
        </Text>
        <Text className="text-gray-700 mb-4">{parsedCourse.description}</Text>
        <View className="flex-row items-center mb-6">
          <Image
            source={{ uri: parsedCourse.instructor.picture.medium }}
            className="w-12 h-12 rounded-full mr-3"
          />

          <View>
            <Text className="font-semibold">
              {parsedCourse.instructor.name.first}{" "}
              {parsedCourse.instructor.name.last}
            </Text>

            <Text className="text-gray-500 text-sm">
              Instructor • {parsedCourse.brand}
            </Text>
          </View>
        </View>
        <View className="mb-6">
          <Text className="text-gray-700">
            Rating: ⭐ {parsedCourse.rating}
          </Text>

          <Text className="text-gray-700">Price: ${parsedCourse.price}</Text>

          <Text className="text-gray-700">
            Discount: {parsedCourse.discountPercentage}%
          </Text>
        </View>
        <Pressable
          onPress={handlePress}
          className={`p-4 rounded-lg ${buttonColor}`}
        >
          <Text className="text-white text-center font-semibold">
            {buttonLabel}
          </Text>
        </Pressable>
        {isCompleted && (
          <View className="bg-green-100 p-3 rounded-lg mt-4">
            <Text className="text-green-700 font-semibold text-center">
              ✓ Course Completed
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
