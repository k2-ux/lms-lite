import { sendBookmarkNotification } from "@/utils/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface CourseState {
  bookmarks: any[];
  enrolled: number[];
  completed: number[];

  toggleBookmark: (course: any) => Promise<void>;
  loadBookmarks: () => Promise<void>;

  toggleEnroll: (courseId: number) => Promise<void>;
  markCompleted: (courseId: number) => Promise<void>;
  loadEnrollment: () => Promise<void>;
  cleanEnrollment: () => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  bookmarks: [],
  enrolled: [],
  completed: [],

  toggleBookmark: async (course) => {
    const userId = await SecureStore.getItemAsync("user_id");

    const storageKey = `bookmarks_${userId}`;

    const { bookmarks } = get();

    const exists = bookmarks.find((c) => c.id === course.id);

    let updated;

    if (exists) {
      updated = bookmarks.filter((c) => c.id !== course.id);
    } else {
      updated = [...bookmarks, course];
    }

    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));

    set({ bookmarks: updated });

    if (updated.length === 5) {
      await sendBookmarkNotification();
    }
  },
  loadBookmarks: async () => {
    const userId = await SecureStore.getItemAsync("user_id");

    const storageKey = `bookmarks_${userId}`;

    const stored = await AsyncStorage.getItem(storageKey);

    if (stored) {
      set({ bookmarks: JSON.parse(stored) });
    } else {
      set({ bookmarks: [] });
    }
  },
  toggleEnroll: async (courseId) => {
    const userId = await SecureStore.getItemAsync("user_id");
    const storageKey = `enrolled_${userId}`;

    const { enrolled } = get();

    let updated;

    if (enrolled.includes(courseId)) {
      updated = enrolled.filter((id) => id !== courseId);
    } else {
      updated = [...enrolled, courseId];
    }

    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));

    set({ enrolled: updated });
  },
  markCompleted: async (courseId) => {
    const userId = await SecureStore.getItemAsync("user_id");
    const storageKey = `completed_${userId}`;

    const { completed } = get();

    if (completed.includes(courseId)) return;

    const updated = [...completed, courseId];

    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));

    set({ completed: updated });
  },

  loadEnrollment: async () => {
    const userId = await SecureStore.getItemAsync("user_id");

    const enrolledKey = `enrolled_${userId}`;
    const completedKey = `completed_${userId}`;

    const enrolled = await AsyncStorage.getItem(enrolledKey);
    const completed = await AsyncStorage.getItem(completedKey);

    set({
      enrolled: enrolled ? JSON.parse(enrolled) : [],
      completed: completed ? JSON.parse(completed) : [],
    });
  },
  cleanEnrollment: async () => {
    set({ enrolled: [] });
  },
}));
