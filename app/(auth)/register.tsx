import { registerUser } from "@/services/auth.service";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Username is required");
      return;
    }

    const normalizedUsername = name.trim().toLowerCase();

    try {
      setLoading(true);

      await registerUser(normalizedUsername, email, password);

      Alert.alert("Success", "Account created. Please login.");

      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Signup Failed", "Unable to register user");
    } finally {
      setLoading(false);
    }
  }
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 p-4 rounded-lg mb-4 text-black"
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 p-4 rounded-lg mb-4 text-black"
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 p-4 rounded-lg mb-4 text-black"
        placeholderTextColor="#888"
      />

      <Pressable onPress={handleSignup} className="bg-blue-600 p-4 rounded-lg">
        <Text className="text-white text-center font-semibold">
          {loading ? "Signing up..." : "Sign Up"}
        </Text>
      </Pressable>
      <Pressable onPress={() => router.push("/(auth)/login")} className="mt-4">
        <Text className="text-center text-blue-600">
          Already have an account? Login
        </Text>
      </Pressable>
    </View>
  );
}
