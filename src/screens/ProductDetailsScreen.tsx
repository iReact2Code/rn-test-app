import React, { useLayoutEffect, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import NetworkImage from '../components/NetworkImage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { PRODUCTS } from '../data/products';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/slices/cartSlice';
import { useToast } from '../components/Toast';
import CartIcon from '../components/CartIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const { show } = useToast();
  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === route.params.id),
    [route.params.id],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <CartIcon onPress={() => navigation.navigate('Cart')} />
      ),
    });
  }, [navigation]);

  if (!product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const price = route.params.priceOverride ?? product.price;
  const isOffer = typeof route.params.priceOverride === 'number';
  const savingsPct = isOffer
    ? Math.round(((product.price - price) / product.price) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <NetworkImage
        uri={product.image}
        style={styles.image}
        fallbackLabel="No image"
      />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{product.title}</Text>
          {isOffer ? <Text style={styles.badge}>Limited</Text> : null}
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {isOffer ? (
            <Text style={styles.original}>${product.price.toFixed(2)}</Text>
          ) : null}
        </View>
        {isOffer ? (
          <Text style={styles.savings}>Save {savingsPct}% today</Text>
        ) : null}
        <Text style={styles.desc}>{product.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const toAdd = route.params.priceOverride
              ? {
                  ...product,
                  id: `${product.id}#offer:${route.params.offerId}`,
                  price,
                }
              : product;
            dispatch(addToCart(toAdd));
            show('Added to cart', 1600, {
              label: 'View Cart',
              onPress: () => navigation.navigate('Cart'),
            });
          }}
        >
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 320, backgroundColor: '#eee' },
  info: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'center', columnGap: 8 },
  badge: {
    backgroundColor: '#fde68a',
    color: '#92400e',
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', columnGap: 8 },
  price: { fontSize: 18, color: '#333', marginBottom: 2 },
  original: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginBottom: 2,
  },
  savings: { color: '#166534', fontWeight: '700', marginBottom: 8 },
  desc: { fontSize: 14, color: '#444', marginBottom: 16 },
  button: {
    backgroundColor: '#1f6feb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
