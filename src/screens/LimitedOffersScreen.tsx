import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { OFFERS } from '../data/offers';
import { PRODUCTS } from '../data/products';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/slices/cartSlice';
import { useToast } from '../components/Toast';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

function formatRemaining(ms: number) {
  if (ms <= 0) {
    return 'Expired';
  }
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function LimitedOffersScreen() {
  const dispatch = useAppDispatch();
  const [now, setNow] = useState(Date.now());
  const [picked, setPicked] = useState<string | null>(null);
  const { show } = useToast();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const offersWithProducts = useMemo(() => {
    return OFFERS.map((offer) => {
      const product = PRODUCTS.find((p) => p.id === offer.productId);
      return { offer, product } as const;
    }).filter((x) => x.product);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => {
            const valid = offersWithProducts.filter(
              (x) => new Date(x.offer.endsAt).getTime() - now > 0,
            );
            if (valid.length === 0) {
              return;
            }
            const pick = valid[Math.floor(Math.random() * valid.length)];
            const displayProduct = {
              ...pick.product!,
              id: `${pick.product!.id}#offer:${pick.offer.id}`,
              price: pick.offer.price,
            };
            dispatch(addToCart(displayProduct));
            show('Deal added to cart', 1600, {
              label: 'View Cart',
              onPress: () => navigation.navigate('Cart'),
            });
            setPicked(pick.offer.id);
            setTimeout(() => setPicked(null), 1200);
          }}
          style={styles.pickBtn}
        >
          <Text style={styles.pickBtnText}>Pick for me</Text>
        </TouchableOpacity>
        {picked ? (
          <Text style={styles.pickedText}>Added offer {picked} to cart</Text>
        ) : null}
      </View>
      <FlatList
        data={offersWithProducts}
        keyExtractor={(item) => item.offer.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const { offer, product } = item;
          const endsAtMs = new Date(offer.endsAt).getTime();
          const remaining = Math.max(0, endsAtMs - now);
          const expired = remaining <= 0;
          const displayProduct = {
            ...product!,
            // Compose a unique id so cart keeps offer items separate
            id: `${product!.id}#offer:${offer.id}`,
            // Override price with discounted price
            price: offer.price,
          };
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => {
                navigation.navigate('ProductDetails', {
                  id: product!.id,
                  offerId: offer.id,
                  priceOverride: offer.price,
                });
              }}
            >
              <Text style={styles.title}>{offer.title}</Text>
              {offer.description ? (
                <Text style={styles.subtitle}>{offer.description}</Text>
              ) : null}
              <View style={styles.row}>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>${offer.price.toFixed(2)}</Text>
                  <Text style={styles.originalPrice}>
                    ${product!.price.toFixed(2)}
                  </Text>
                </View>
                <Text style={[styles.countdown, expired && styles.expired]}>
                  {formatRemaining(remaining)}
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  disabled={expired}
                  onPress={() => {
                    dispatch(addToCart(displayProduct));
                    show('Deal added to cart', 1600, {
                      label: 'View Cart',
                      onPress: () => navigation.navigate('Cart'),
                    });
                  }}
                  style={[styles.btn, expired && styles.btnDisabled]}
                >
                  <Text style={styles.btnText}>
                    {expired ? 'Expired' : 'Add to Cart'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa' },
  list: { padding: 12 },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  pickBtn: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pickBtnText: { color: '#fff', fontWeight: '700' },
  pickedText: { color: '#1f6feb' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '700' },
  subtitle: { color: '#555', marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  price: { fontSize: 18, fontWeight: '700', color: '#1f6feb' },
  countdown: { fontVariant: ['tabular-nums'], color: '#333' },
  expired: { color: '#999' },
  actions: { marginTop: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', columnGap: 8 },
  originalPrice: { textDecorationLine: 'line-through', color: '#888' },
  btn: {
    backgroundColor: '#1f6feb',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnDisabled: { backgroundColor: '#a1b5e0' },
  btnText: { color: '#fff', fontWeight: '700' },
});
