import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks';
import { selectCartCount } from '../store/selectors/cartSelectors';

type Props = { onPress?: () => void };

export default function CartIcon({ onPress }: Props) {
  const count = useAppSelector(selectCartCount);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.cart}>🛒</Text>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 8 },
  cart: { fontSize: 20 },
  badge: {
    position: 'absolute',
    top: 2,
    right: 6,
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
