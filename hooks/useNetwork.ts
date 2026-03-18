import * as Network from "expo-network";
import { useEffect, useState } from "react";

export function useNetwork() {
  const [isConnected, setIsConnected] = useState(true);

  async function checkNetwork() {
    const state = await Network.getNetworkStateAsync();
    setIsConnected(state.isConnected ?? true);
  }

  useEffect(() => {
    checkNetwork();

    const interval = setInterval(checkNetwork, 5000);

    return () => clearInterval(interval);
  }, []);

  return isConnected;
}
