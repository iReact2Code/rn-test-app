import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCartSubtotal } from '../store/selectors/cartSelectors';
import { clearCart } from '../store/slices/cartSlice';

export default function CheckoutScreen() {
  const subtotal = useAppSelector(selectCartSubtotal);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Order Summary</Text>
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Shipping: $0.00</Text>
        <Text style={styles.total}>Total: ${subtotal.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.primaryText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f8fa' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, gap: 8 },
  title: { fontSize: 18, fontWeight: '700' },
  total: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  primaryBtn: {
    marginTop: 16,
    backgroundColor: '#1f6feb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
});
