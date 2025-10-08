const Reanimated = require('react-native-reanimated/mock');

// Ensure a default export for libraries expecting it
Reanimated.default = Reanimated;

// Silence the worklet warning in tests
if (Reanimated.default && !Reanimated.default.call) {
  Reanimated.default.call = () => {};
}

module.exports = Reanimated;
