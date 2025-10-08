import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NetworkImage from './NetworkImage';
import type { Product } from '../types';

type Props = {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
};

export default function ProductCard({ product, onPress, onAddToCart }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <NetworkImage
        uri={product.image}
        style={styles.image}
        fallbackLabel="No image"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        {onAddToCart && (
          <TouchableOpacity style={styles.button} onPress={onAddToCart}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
    elevation: 2,
  },
  image: { width: '100%', height: 180, backgroundColor: '#eee' },
  info: { padding: 12 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 14, color: '#333', marginBottom: 8 },
  button: {
    backgroundColor: '#1f6feb',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
