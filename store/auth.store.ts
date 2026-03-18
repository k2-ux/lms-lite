import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: any | null;
  isHydrated: boolean;

  setAuth: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isHydrated: false,

  setAuth: async (token, user) => {
    await SecureStore.setItemAsync("auth_token", token);
    await SecureStore.setItemAsync("user_id", user.email);
    await SecureStore.setItemAsync("auth_user", JSON.stringify(user));

    set({ token, user });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("auth_token");
    await SecureStore.deleteItemAsync("auth_user");
    await SecureStore.deleteItemAsync("user_id");
    set({ token: null, user: null });
  },

  loadToken: async () => {
    const token = await SecureStore.getItemAsync("auth_token");
    const userString = await SecureStore.getItemAsync("auth_user");

    set({
      token: token ?? null,
      user: userString ? JSON.parse(userString) : null,
      isHydrated: true,
    });
  },
}));
