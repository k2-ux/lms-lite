import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  title: string;
  showBack?: boolean;
}

export default function AppHeader({ title, showBack }: Props) {
  return (
    <SafeAreaView style={{ backgroundColor: "#dbff76" }}>
      <View className="px-4 py-4 flex-row items-center">
        {showBack && (
          <Pressable onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={22} color="black" />
          </Pressable>
        )}

        <Text className="text-black text-lg font-semibold">{title}</Text>
      </View>
    </SafeAreaView>
  );
}
