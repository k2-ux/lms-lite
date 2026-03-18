import { useNetwork } from "@/hooks/useNetwork";
import { Text, View } from "react-native";

export default function OfflineBanner() {
  const isConnected = useNetwork();

  if (isConnected) return null;

  return (
    <View className="bg-red-500 p-2 items-center">
      <Text className="text-white font-semibold">No Internet Connection</Text>
    </View>
  );
}
