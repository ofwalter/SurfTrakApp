# SurfTrak – Product Requirements Document (Updated)

## Project Overview

You are creating a React Native Expo application designed for iOS use, built entirely with TypeScript for enhanced type safety and developer experience. The app's core purpose is to help surfers view their waves and stats. Users will see detailed statistics from their surf sessions, easily browse historical data, and share or analyze their performance over time.

**Technical Stack**
- TypeScript for all application code
- React Native with Expo
- NativeWind for styling
- Firebase for backend services

**UI Style Guide & Principles**  
- **Rounded Aesthetic**: All UI elements have rounded corners.  
- **NativeWind**: Use Tailwind-like styling to keep the UI consistent, minimal, and maintainable.  
- **react-native-reusables**: Leverage ready-made, modular UI components (cards, inputs, modals, etc.).  
- **Clean, Surf-Inspired**: White backgrounds with ocean/surf-themed blues for accents.  
- **Color Palette**:  
  - White (#FFFFFF) for primary backgrounds  
  - Ocean Blue (#1A73E8), Deep Cerulean (#0056B3), Lighter Azure (#2F95DC), Surf Blue (#4AB1FF)

**Core Design/Implementation Notes**  
- Use consistent border radii (12–16px) and spacing for components.  
- Single typography configuration for clarity and brand consistency.  
- Minimalistic, modern iOS-style layout with ample padding and an oceanic aesthetic.

---

## Page Overview

1. **Homepage**  
2. **Sessions**  
3. **Forecasting** (placeholder)  
4. **Profile**

**Navbar**  
- A sleek, simple white navbar with 4 equal buttons (icons: Home, GPS, Map, Profile).  
- Rounded styling (via NativeWind + `react-native-reusables`) consistent with the surf theme.  
- Appears on every page for bottom-tab navigation.

### Homepage

- **Top Bar**: 
  - User's profile photo (circle) on the left  
  - "Homepage" header in the middle  
  - Help button (circle) on the right  

- **Goal Card** (beneath top bar):  
  - ~¼ of screen height, rectangular card with an animated semicircle progress bar.  
  - Encourages user by showing waves caught toward a goal.

- **Lifetime Stats**:  
  - Horizontally scrollable row of rounded info boxes.  
  - Each box has a unique blue shade, showing data like average speed, longest wave, total distance, etc.

- **Placeholder Cards**:  
  - Two placeholder info cards, plus one additional placeholder below them, for future content.  
  - The homepage is vertically scrollable.

### Sessions

- **Header Row** (top):  
  - Left: Pulsing blue "ADD" button (circle with plus sign).  
  - Middle: "Sessions" header.  
  - Right: Filter button.

- **Session Cards** (beneath header row):  
  - Each card shows date, time, and location of a session, with possible stats (wave count, top speed, etc.).  
  - Tappable to view more detailed session or wave data.

### Forecasting

- **Placeholder Page**  
  - Simple "Coming Soon" or empty content.  
  - Will later provide surf forecasts or wave conditions.

### Profile

- Shows user's picture, short stats recap, and personal info (name, etc.).  
- Includes app settings, such as light/dark mode toggle, and a logout button.

---

## Below Is the Core PRD

### 1. Overview

**Product Name:** SurfTrak

**Purpose:**  
SurfTrak is a mobile application that organizes, analyzes, and displays surfing metrics for the user, helping them gain insights into their surfing sessions over time.

**Primary Goals:**  
1. Allow surfers to track and record detailed session information, including waves caught and wave statistics.  
2. Provide personalized stats (duration, max speed, wave count, etc.) for each session and wave.  
3. Present a lifetime summary of surfing performance (e.g., total waves, average speed, best wave, etc.).  
4. Offer an onboarding flow that helps users quickly set up their profile.  
5. Provide additional features like forecast information and a robust profile page for settings and app customization.

---

### 2. Target Audience

- **Amateur Surfers:** Hobbyists who want more data-driven insights into their surf sessions.  
- **Enthusiast Surfers:** Frequent surfers interested in performance data, wave analysis, and technique improvement.  
- **Professional Surfers/Coaches:** May use advanced analytics to track improvement and stats over long periods.

---

### 3. Key Features

1. **Session Tracking & Management**  
   - Displays a list of recorded sessions (location, date, time).  
   - Tracks wave count, wave speeds, and durations for each session.  
   - Allows users to dive into session details to see wave-by-wave breakdown.

2. **Wave Data Analytics**  
   - Each "Session" can have multiple "Waves."  
   - A wave is determined by a speed threshold and time stamp.  
   - Display wave-specific metrics (start/end time, duration, top speed, average speed, distance traveled, etc.).

3. **User Personalization**  
   - Home screen with lifetime statistics (total sessions, total waves, personal bests, etc.).  
   - Encouraging goals or achievements (e.g., surf 3 times in a week, catch 10 waves in a session).  
   - Personalized settings (profile info, light/dark mode, notification preferences).

4. **Forecast (Placeholder for Future)**  
   - Placeholder screen for surf forecasts and wave conditions at specific breaks.

5. **Profile & Settings**  
   - User summary with short performance overview.  
   - Profile picture, name, bio (optional).  
   - Settings for theme mode (light/dark).  
   - Logout and general user preference management.

6. **Authentication & Onboarding**  
   - Sign-up and login using Firebase Auth (email/password, plus optional social sign-in if desired).  
   - Onboarding flow to guide new users through setting up their account and explaining data upload steps.

---

### 4. Technical Architecture

**Platform:**  
- **Frontend:** React Native (managed by Expo), using **Expo Router** for navigation.  
- **Styling:** **NativeWind** for Tailwind-like styling, **react-native-reusables** for UI components.  
- **Backend:** Firebase (Authentication, Firestore Database, Storage).

**Data Flow Overview**  
1. **CSV Upload**: Users will upload CSV files containing raw wave/session data.  
2. **Local Processing**: The raw data from the CSV is analyzed locally in the app (e.g., wave detection, speed calculations).  
3. **Firebase Upload**: The **analyzed** session + wave data is then stored in Firestore for future access and analytics.  
4. **Client Display**: The React Native client pulls user-specific sessions and waves from Firestore, displaying them in the UI.

---

### 5. Detailed Requirements

#### 5.1 Onboarding

- **Welcome Screen**: Brief intro with SurfTrak branding.  
- **Sign Up / Login**:  
  - Email & password via Firebase Auth.  
  - Store user's profile info in Firestore (displayName, avatar URL, stats overview).  
- **Data Upload Instructions**:  
  - Basic overview of how to format and upload CSV files (for wave/session data).

#### 5.2 Navigation & Tabs

Utilize **Expo Router**. The bottom tab navigation will include four primary screens:

1. **Home (icon: home)**  
   - Overview of lifetime surf stats (wave count, total session count, best wave, total hours surfed).  
   - News & updates (e.g., announcements about new features).  
   - Encouraging goal or challenge banners.

2. **Sessions (icon: gps)**  
   - Displays a scrollable list of session cards, each showing:  
     - Session date/time.  
     - Location.  
     - Optional session-level stats (wave count, top speed, total duration).  
   - **Session Detail Screen** (navigated by tapping a session card):  
     - Detailed stats about that particular session.  
     - List of waves (with mini stats like wave #, wave speed, wave time).  
     - Wave detail can show a small map or a speed graph if relevant/available.

3. **Forecast (icon: map)**  
   - **Placeholder** for future expansion.  
   - Possibly includes surf break maps, wave height predictions, etc.  
   - Currently, can be a blank or "Coming Soon" page.

4. **Profile (icon: profile)**  
   - Displays user summary (name, profile picture, short stats recap).  
   - Settings:  
     - Light/Dark mode toggle.  
     - Notification preferences (future).  
   - Logout button.  

#### 5.3 Session & Wave Data

- **Session**  
  - **Required Fields**: userId (owner), sessionId, location (GPS), startTime, endTime, waveCount, averageSpeed, maxSpeed, totalDuration.  
  - **Relationships**: references a list of wave documents in Firestore.

- **Wave**  
  - **Required Fields**: waveId, sessionId, waveNumber, startTime, endTime, duration, topSpeed, averageSpeed, path (array of GPS coordinates, if stored).  
  - Each wave belongs to exactly one session.

*(No direct mention of hardware device for data upload—CSV-based for now.)*

#### 5.4 Authentication

- **Firebase Auth**  
  - Email/Password sign-up and login.  
  - Optional extension to social providers (Google, Apple) in the future.  
- **Secure Storage**: store JWT tokens or session tokens securely on the device (e.g., `expo-secure-store` or `AsyncStorage`).

#### 5.5 Analytics & Statistics

- **Lifetime Stats**:  
  - Summation of all waves, all sessions.  
  - Best wave or session metrics (max speed, longest wave, etc.).  
- **Session Stats**:  
  - Summation from wave objects (session wave count, average speed).  
  - Potentially show a chart or map of wave speeds over time.  
- **Wave Stats**:  
  - Speed profile, wave distance, wave time, wave peak speed.

---

### 6. UI/UX Requirements

1. **Branding & Style**  
   - Clean, minimalistic, oceanic or coastal theme.  
   - **NativeWind** for styling (rounded corners, consistent spacing).  
   - **react-native-reusables** for common UI elements (cards, modals, etc.).  

2. **Session Card Component**  
   - Minimal text: session date, location, wave count.  
   - Possibly a small icon representing conditions or a mini map of the session area.  
   - Tappable to navigate to session detail.

3. **Typography & Layout**  
   - Clear headings for main stats (bold & large for emphasis).  
   - Cards, boxes, and sections for grouping relevant data.  
   - Use consistent spacing and a "light shadow" effect for a modern iOS feel.

4. **Responsive & Scalable**  
   - Layouts adapt to different device sizes (phones, tablets).  
   - Keep performance in mind when rendering multiple sessions or wave detail charts.

---

### 7. File Structure (Proposed)

```
SurfTrak/
├── app/
│   ├── _layout.tsx            // Expo Router layout definition
│   ├── index.tsx              // Home screen route
│   ├── sessions/
│   │   ├── index.tsx          // Sessions list screen
│   │   └── [sessionId].tsx    // Session detail screen
│   ├── forecast/
│   │   └── index.tsx          // Forecast (placeholder)
│   ├── profile/
│   │   └── index.tsx          // Profile screen
│   └── onboarding/
│       └── index.tsx          // Onboarding flow
├── components/
│   ├── SessionCard.tsx        // Custom session card component
│   └── WaveDetail.tsx         // Custom wave detail component
├── contexts/
│   └── AuthContext.tsx        // Provide user auth state across the app
├── services/
│   ├── firebase.ts           // Firebase config & initialization
│   └── dataService.ts        // CRUD for sessions/waves in Firestore
├── types/
│   ├── session.ts            // Session type definitions
│   ├── wave.ts              // Wave type definitions
│   └── user.ts              // User type definitions
├── utils/
│   └── calculations.ts       // Wave detection logic, speed/distance calcs
├── assets/
│   └── ...                   // Images, icons, fonts, etc.
├── App.tsx                   // Entry point
├── package.json
├── tsconfig.json            // TypeScript configuration
├── README.md
└── .gitignore
```

- `app/` leverages **Expo Router** conventions.  
- `components/` contains reusable UI components (cards, wave detail, etc.).  
- `contexts/` for global states like authentication.  
- `services/` for external integrations (Firebase).  
- `utils/` for business logic or helper functions.

---

### 8. Data Models (TypeScript Interfaces)

#### 8.1 User Interface
```typescript
interface User {
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 8.2 Session Interface
```typescript
interface Session {
  sessionId: string;
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  startTime: Date;
  endTime: Date;
  waveCount: number;
  averageSpeed: number;
  maxSpeed: number;
  totalDuration: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 8.3 Wave Interface
```typescript
interface Wave {
  waveId: string;
  sessionId: string;
  waveNumber: number;
  startTime: Date;
  endTime: Date;
  duration: number;
  topSpeed: number;
  averageSpeed: number;
  path: Array<{
    latitude: number;
    longitude: number;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### 9. Security & Compliance

- **Firebase Security Rules**: Only authenticated users can read/write their own data.  
- **Data Privacy**: Surf data is sensitive; handle location and stats with care.  
- **Encryption in Transit**: Use HTTPS/SSL for all data transfer.

---

### 10. Performance & Scalability

- **Offline Capabilities** (optional future item):  
  - Might store CSV data or wave details locally and sync to Firestore when online.  
- **Pagination / Lazy Loading**:  
  - For large session lists, wave sets, or analytics.  
- **Batch Writes**:  
  - If wave data is large, consider chunked uploads to Firestore.

---

### 11. Testing & QA

- **Unit Tests** for core functions (wave detection, calculations, Firebase calls).  
- **Integration Tests** for end-to-end flows (upload CSV, parse data, view sessions).  
- **UI Tests** to ensure stable rendering on iOS devices.  
- **Beta Testing** with TestFlight to get feedback and bug reports.

---

### 12. Roadmap (High-Level)

1. **MVP (Phase 1)**  
   - Basic onboarding & authentication.  
   - CSV upload + local parsing.  
   - Home screen with lifetime stats.  
   - Sessions listing & details with wave data.  
   - Basic profile & settings.  
   - Forecast placeholder.

2. **Phase 2**  
   - Enhanced wave analytics (charts, path mapping).  
   - Achievements or badges.  
   - Expanded profile customization.  
   - Forecast screen integration (API-based wave conditions).

3. **Phase 3**  
   - Social or friend features (share session highlights).  
   - Community comparisons.  
   - Online coaching or real-time feedback modules.

---

### 13. Conclusion

This PRD outlines the structure, features, and technical specifications for building the **SurfTrak** mobile application using **React Native (Expo)**, **NativeWind** for styling, **react-native-reusables** for UI components, and **Firebase** for authentication and data storage. By focusing on a modern iOS-friendly design, straightforward CSV data uploads, local data analysis, and user-centric features, SurfTrak will help surfers easily track, review, and improve their surfing performance.

**Next Steps:**  
- Finalize UI mockups, leveraging NativeWind's utility classes and `react-native-reusables`.  
- Confirm data model structure (Firestore for sessions/waves, CSV parsing flow).  
- Begin implementation of the MVP with the outlined file structure and architecture.  

