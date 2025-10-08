import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useAppSelector } from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const isAuthenticated = useAppSelector((s) => s.user.isAuthenticated);
  useEffect(() => {
    const id = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login' as never, undefined as never);
      }
    }, 1200);
    return () => clearTimeout(id);
  }, [navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyShop</Text>
      <Text style={styles.tagline}>Quality gear. Fast checkout.</Text>
      <ActivityIndicator size="small" color="#1f6feb" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: { fontSize: 28, fontWeight: '800' },
  tagline: { marginTop: 6, color: '#555' },
  loader: { marginTop: 16 },
});
