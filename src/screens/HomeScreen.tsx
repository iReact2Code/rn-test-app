import React, { useCallback, useLayoutEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/slices/cartSlice';
import CartIcon from '../components/CartIcon';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { DrawerActions } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HeaderActions({
  onCart,
  onUser,
}: {
  onCart: () => void;
  onUser: () => void;
}) {
  return (
    <View style={styles.headerActions}>
      <TouchableOpacity onPress={onUser} style={styles.headerBtn}>
        <Text>User</Text>
      </TouchableOpacity>
      <CartIcon onPress={onCart} />
    </View>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const goToCart = useCallback(() => navigation.navigate('Cart'), [navigation]);
  const goToUser = useCallback(
    () => navigation.getParent()?.navigate('UserCenter' as never),
    [navigation],
  );
  const toggleMenu = useCallback(
    () => navigation.dispatch(DrawerActions.toggleDrawer()),
    [navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <TouchableOpacity onPress={toggleMenu} style={styles.headerMenu}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <HeaderActions onCart={goToCart} onUser={goToUser} />,
    });
  }, [goToCart, goToUser, toggleMenu, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetails', { id: item.id })
            }
            onAddToCart={() => dispatch(addToCart(item))}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa' },
  listContent: { padding: 12 },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  headerBtn: { paddingHorizontal: 8 },
  headerMenu: { paddingHorizontal: 12 },
});
