import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useCart } from '@/contexts/cartContext';
import { styles } from '@/styles/Cart.styles';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.beer.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.beer.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.beer.name}</Text>
              <Text style={styles.price}>R$ {item.beer.price.toFixed(2)}</Text>
              <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
            </View>
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => removeFromCart(item.beer.id)}
            >
              <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: R$ {getTotalPrice().toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
