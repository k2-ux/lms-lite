import { useCourseStore } from "@/store/course.store";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function WebViewer() {
  const { id, title, instructor, rating, description } = useLocalSearchParams();
  const { markCompleted } = useCourseStore();
  const htmlContent = `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>

body {
  font-family: Arial;
  padding: 24px;
  line-height: 1.6;
  font-size: 18px;
}

h1 {
  font-size: 26px;
}

.info {
  margin-bottom: 20px;
  color: #555;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
}

</style>
</head>

<body>

<h1>${title}</h1>

<div class="info">
Instructor: ${instructor}<br/>
Rating: ⭐ ${rating}
</div>

<p>${description}</p>

<button id="completeBtn" onclick="completeLesson()">
Mark Lesson Complete
</button>

<div id="native-info" style="margin-bottom:20px;color:#555;"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {

  if (window.nativeHeaders) {
    const el = document.getElementById("native-info");

    el.innerHTML =
      "Course ID from Native: " + window.nativeHeaders.courseId +
      "<br/>User ID from Native: " + window.nativeHeaders.userId;
  }

});

function completeLesson() {
  const btn = document.getElementById("completeBtn");

  btn.innerText = "✓ Lesson Completed";
  btn.style.background = "green";
  btn.disabled = true;

  window.ReactNativeWebView.postMessage("lesson_completed");
}
</script>
</body>
</html>
`;

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView style={{ backgroundColor: "#2563eb" }}>
        <View className="px-4 py-4 flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={22} color="white" />
          </Pressable>

          <Text
            className="text-white text-lg font-semibold flex-1"
            numberOfLines={1}
          >
            Course Content
          </Text>
        </View>
      </SafeAreaView>
      <WebView
        originWhitelist={["*"]}
        source={{
          html: htmlContent,
          headers: {
            "x-course-id": String(id),
            "x-user-id": "demo-user",
          },
        }}
        injectedJavaScript={`
    window.nativeHeaders = {
      courseId: "${id}",
      userId: "demo-user"
    };
    true;
  `}
        startInLoadingState
        renderLoading={() => (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        )}
        onMessage={(event) => {
          const message = event.nativeEvent.data;

          if (message === "lesson_completed") {
            markCompleted(Number(id));
          }
        }}
      />
    </View>
  );
}
