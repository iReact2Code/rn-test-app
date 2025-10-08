import React, { useMemo } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectCartItems,
  selectCartSubtotal,
} from '../store/selectors/cartSelectors';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/slices/cartSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

function CartFooter({
  subtotal,
  itemCount,
  onClear,
  onCheckout,
}: {
  subtotal: number;
  itemCount: number;
  onClear: () => void;
  onCheckout: () => void;
}) {
  return (
    <View style={styles.footer}>
      <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={[styles.primaryBtn, styles.secondaryBtn]}
          onPress={onClear}
        >
          <Text style={styles.primaryText}>Clear cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryBtn, itemCount === 0 && styles.disabledBtn]}
          disabled={itemCount === 0}
          onPress={onCheckout}
        >
          <Text style={styles.primaryText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CartScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const itemsMap = useAppSelector(selectCartItems);
  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);
  const subtotal = useAppSelector(selectCartSubtotal);
  const itemCount = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.flex1}>{item.product.title}</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() =>
                  dispatch(
                    updateQuantity({
                      id: item.product.id,
                      quantity: Math.max(0, item.quantity - 1),
                    }),
                  )
                }
              >
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() =>
                  dispatch(
                    updateQuantity({
                      id: item.product.id,
                      quantity: item.quantity + 1,
                    }),
                  )
                }
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(removeFromCart(item.product.id))}
              style={styles.removeBtn}
            >
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <CartFooter
            subtotal={subtotal}
            itemCount={itemCount}
            onClear={() => dispatch(clearCart())}
            onCheckout={() => {
              if (itemCount === 0) {
                return;
              }
              navigation.navigate('Checkout');
            }}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContent: { padding: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  flex1: { flex: 1 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  qty: { width: 24, textAlign: 'center' },
  removeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  footer: { paddingVertical: 16, gap: 12 },
  footerRow: { flexDirection: 'row', columnGap: 12 },
  subtotal: { fontSize: 16, fontWeight: '700' },
  primaryBtn: {
    backgroundColor: '#1f6feb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  disabledBtn: { backgroundColor: '#aaa' },
  secondaryBtn: { backgroundColor: '#888' },
  primaryText: { color: '#fff', fontWeight: '700' },
});
