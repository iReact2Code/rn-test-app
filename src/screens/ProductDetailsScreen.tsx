import React, { useMemo } from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === route.params.id),
    [route.params.id],
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Product not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NetworkImage
        uri={product.image}
        style={styles.image}
        fallbackLabel="No image"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(addToCart(product));
            navigation.navigate('Cart');
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
  price: { fontSize: 18, color: '#333', marginBottom: 8 },
  desc: { fontSize: 14, color: '#444', marginBottom: 16 },
  button: {
    backgroundColor: '#1f6feb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
