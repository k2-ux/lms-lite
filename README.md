# Mini LMS App (React Native Expo)

This is a simple Learning Management System (LMS) mobile app built using React Native Expo.  
The app focuses on core mobile features like authentication, state management, WebView integration, and offline handling.

---

## Features

### Authentication

- User login and registration
- Token stored securely using Expo SecureStore
- Auto login when the app restarts
- Logout with proper state reset

---

### Course Catalog

- List of courses with instructor details
- Search functionality to filter courses
- Pull-to-refresh for updating data
- Bookmark courses (saved locally)

---

### Course Details

- View full course information
- Enroll in a course
- Continue or review completed courses
- Mark course as completed

---

### WebView Integration

- Course content is shown inside a WebView
- Native app sends data to WebView using headers
- WebView can communicate back to the app

---

### Notifications

- Notification when user bookmarks 5 courses
- Reminder notification after inactivity

---

### Profile Screen

- Update profile image
- View learning stats:
  - Enrolled courses
  - Completed courses
  - Bookmarked courses
  - Completion rate

---

## Tech Stack

- React Native Expo
- TypeScript (strict mode)
- Expo Router
- NativeWind (Tailwind CSS)
- Zustand (state management)
- AsyncStorage (app data)
- SecureStore (sensitive data)
- Expo Notifications
- WebView

---

## Setup Instructions

```bash
git clone <repo-url>
cd project
npm install
npx expo start
```

## Environment Variables

Create a .env file in the root folder:

EXPO_PUBLIC_API_BASE_URL=https://api.freeapi.app/api/v1

Restart the app after adding the file:

npx expo start -c

## APK Build
1. Development Build (Debug)
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile development

This build is intended for development and testing

Requires running npx expo start to connect

2. Preview Build (Standalone / Release-like)
eas build -p android --profile preview

This build can be installed and used directly

Recommended for quick testing without setup

## Key Architectural Decisions

Zustand is used for simple and lightweight global state management

SecureStore is used for storing authentication data securely

AsyncStorage is used for storing bookmarks, enrolled, and completed courses

Data is stored per user using email as a unique key

WebView is used to simulate real LMS content delivery

Axios is used with basic error handling and retry logic

## Known Issues / Limitations

No backend persistence for user data (data is stored locally)

Progress is calculated using completed vs enrolled courses, not actual lesson progress

WebView content is static and not from a real backend

User profile picture is not stored in cloud (Locally stored)

## Screenshots

<img width="108" height="240" alt="login" src="https://github.com/user-attachments/assets/c46f0449-5787-444a-9f35-7d4d45c7cef5" />
<img width="108" height="240" alt="register" src="https://github.com/user-attachments/assets/5833f356-01bd-40b7-9e4a-8730302e6819" />
<img width="108" height="240" alt="courses" src="https://github.com/user-attachments/assets/3fd9a0b6-f834-41d5-b0be-cb34abf3ba56" />
<img width="108" height="240" alt="coursedetail" src="https://github.com/user-attachments/assets/1d04e676-ede7-44a9-8c24-a16004e1f95f" />
<img width="108" height="240" alt="webview" src="https://github.com/user-attachments/assets/4c6e059e-3696-4d16-a591-e29f81399550" />
<img width="108" height="240" alt="profile" src="https://github.com/user-attachments/assets/cf2fc770-1a11-48df-92dd-1038edd8916f" />


## Demo Video

## Notes

The app supports both portrait and landscape mode

Basic offline handling is implemented

Focus was on building a clean and scalable structure rather than adding unnecessary features


---
