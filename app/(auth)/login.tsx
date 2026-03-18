import { loginUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useCourseStore } from "@/store/course.store";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    try {
      if (!email.trim()) {
        Alert.alert("Validation Error", "Email is required");
        return;
      }

      if (!password.trim()) {
        Alert.alert("Validation Error", "Password is required");
        return;
      }
      setLoading(true);

      const data = await loginUser(email, password);

      const token = data?.data?.accessToken;
      const user = data?.data?.user;

      await setAuth(token, user);
      await useCourseStore.getState().loadBookmarks();
      await useCourseStore.getState().loadEnrollment();
      router.replace("/(tabs)");
    } catch (error: any) {
      if (error.response?.data?.message) {
        Alert.alert("Login Failed", error.response.data.message);
      } else if (error.request) {
        Alert.alert("Network Error", "Unable to reach server");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">
        LMS Lite Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 p-4 rounded-lg mb-4 text-black"
        placeholderTextColor="#888"
      />

      <TextInput
        placeholderTextColor="#888"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 p-4 rounded-lg mb-4 text-black"
      />

      <Pressable onPress={handleLogin} className="bg-blue-600 p-4 rounded-lg">
        <Text className="text-white text-center font-semibold">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(auth)/register")}
        className="mt-4"
      >
        <Text className="text-center text-blue-600">Create new account</Text>
      </Pressable>
    </View>
  );
}
