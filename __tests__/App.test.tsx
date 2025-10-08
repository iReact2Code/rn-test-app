/**
 * @format
 */

import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => <>{children}</>,
}));

jest.mock('react-native-screens', () => ({ enableScreens: jest.fn() }));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => {
    const Stack: any = ({ children }: any) => <>{children}</>;
    Stack.Navigator = ({ children }: any) => <>{children}</>;
    Stack.Screen = ({ children }: any) => <>{children}</>;
    return Stack;
  },
}));

jest.mock('@react-navigation/elements', () => ({}));

jest.mock('react-redux', () => ({
  Provider: ({ children }: any) => <>{children}</>,
}));

jest.mock('@react-navigation/drawer', () => ({
  createDrawerNavigator: () => {
    const Drawer: any = ({ children }: any) => <>{children}</>;
    Drawer.Navigator = ({ children }: any) => <>{children}</>;
    Drawer.Screen = ({ children }: any) => <>{children}</>;
    return Drawer;
  },
}));

it('renders App without crashing', () => {
  renderer.create(<App />);
});
