# E-commerce App (React Native / TypeScript)

This app is a simple e-commerce demo built on your React Native CLI project. It includes:

- Product list, product details, cart, and checkout screens
- Redux Toolkit store with a cart slice
- React Navigation with native-stack
- Basic unit tests for cart logic

## Scripts

- `npm start` — Start Metro bundler
- `npm run android` — Build & install on Android emulator/device (Windows supported)
- `npm run ios` — Build & run on iOS simulator (requires macOS)
- `npm test` — Run Jest tests
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript checks

## Run on Android (Windows)

1. Prereqs: Install Android Studio and set up an emulator (Pixel series, API 34+ recommended). Ensure `ANDROID_HOME` and `platform-tools` are on PATH.
2. Start Metro in one terminal: `npm start`.
3. Start your emulator from Android Studio (AVD Manager) or plug in a device with USB debugging.
4. In a second terminal: `npm run android`.

If you see "device not found" or SDK errors:

- Reopen a new terminal after installing SDK so PATH updates apply
- Run `adb devices` to verify the device/emulator is listed
- Make sure Developer Options and USB Debugging are enabled on device

## Project structure (key files)

- `App.tsx` — Navigation + Provider wrapper
- `src/navigation/RootNavigator.tsx` — Stack routes
- `src/store/` — Redux Toolkit store and cart slice
- `src/screens/` — Home, ProductDetails, Cart, Checkout
- `src/components/` — ProductCard, CartIcon
- `src/data/products.ts` — Mock product list

## Testing

- Unit tests are in `__tests__/`
- `npm test` runs both unit and simple render tests

## Notes

- iOS project is included but building on Windows is not supported; keep the folder for cross-platform dev.
- The UI is intentionally minimal; extend styles as needed.
