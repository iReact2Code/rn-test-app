# React Native E‑commerce App

![CI](https://github.com/iReact2Code/rn-test-app/actions/workflows/ci.yml/badge.svg)

Release builds:

![Android Release](https://github.com/iReact2Code/rn-test-app/actions/workflows/release-android.yml/badge.svg)

An opinionated React Native e‑commerce starter built with TypeScript, Redux Toolkit, React Navigation, and redux‑persist. Includes a mock API for auth and profile so you can run end‑to‑end without a backend.

## Features

- Product list and details
- Cart and checkout, with guard to prevent empty-cart checkout
- Drawer navigation with a dedicated User Center section
- Authentication (login/register) using a mock API
- User Center: edit personal info (name, phone) and manage addresses
- State management with Redux Toolkit and session persistence via redux‑persist
- Unit tests (Jest + React Testing Library)

## Tech Stack

- React Native 0.74, React 18, TypeScript
- @react-navigation/native (+ native-stack, drawer)
- @reduxjs/toolkit, react-redux, redux-persist
- AsyncStorage, react-native-reanimated, react-native-gesture-handler, react-native-screens, safe-area-context
- Jest (+ ts support) and @testing-library/react-native

## Project Structure (high level)

```
my-app/
   App.tsx                     # Provider + Navigation + PersistGate
   src/
      navigation/RootNavigator.tsx
      screens/                  # Home, ProductDetails, Cart, Checkout, UserCenter, Login, Register
      components/               # ProductCard, NetworkImage, CartIcon
      store/                    # Redux store + slices (cart, user) + selectors
      services/api.ts           # Mock API (auth, profile, addresses)
      data/                     # Sample products
      types/
```

## Scripts

From the `my-app` folder:

```
npm start        # Start Metro
npm run android  # Build & run Android (Windows/Linux/macOS)
npm run ios      # Build & run iOS (macOS only)
npm test         # Run unit tests
npm run lint     # ESLint
npm run typecheck# TypeScript type check
npm run format   # Prettier
```

## Getting Started (Windows + Android)

1) Ensure the React Native environment is installed (Android Studio, SDKs, AVD; ANDROID_HOME and platform-tools on PATH).

2) Start Metro in one terminal:

```
npm start
```

3) In another terminal, with an emulator running (or a device connected), run:

```
npm run android
```

If Metro is already running, the CLI will connect automatically.

## Authentication & Mock API

- Login/Register work against `src/services/api.ts` (in‑memory mock). No network calls.
- User profile updates (name/phone) and address CRUD persist for the current app session (and across restarts via redux‑persist).

## Testing

```
npm test
```

Notes:
- The project is configured for TypeScript tests.
- See `__tests__/userSlice.test.ts` for example reducer tests.

## Troubleshooting

- CLI warning about `@react-native-community/cli`: we include it in devDependencies.
- "Dev server already running on 8081": that’s fine; React Native will reuse it.
- Stuck bundle / white screen: open the dev menu (Ctrl+M on Windows) and tap Reload.
- Missing Android SDK tools: open Android Studio, install latest SDK Platform + Build‑Tools, then restart your terminal.
- If Gradle issues persist, try `./gradlew clean` inside `android/` via Android Studio.

## Notes
- GitHub Actions includes a Release workflow that builds Android release APK/AAB on tags matching `v*.*.*`. Create a tag and push it to trigger:

```
git tag v1.0.0
git push origin v1.0.0
```

Artifacts will be available in the workflow run under Actions.

- The Android debug keystore (`android/app/debug.keystore`) is ignored by Git and not stored in the repo.
- iOS build requires macOS with Xcode.

