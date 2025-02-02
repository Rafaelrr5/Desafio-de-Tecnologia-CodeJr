import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useCart } from '@/contexts/cartContext';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    paddingTop: 80, // Changed from 50 to 80 to move content down
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D98B00',
    marginTop: 5,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#D98B00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
