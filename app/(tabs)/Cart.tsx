import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useCart } from '@/contexts/cartContext';
import { styles } from '@/styles/Cart.styles';
import { Beer } from '@/types/beer';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (beerId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) {
      Alert.alert(
        "Remover item",
        "Deseja remover este item do carrinho?",
        [
          { text: "Cancelar" },
          { text: "Remover", onPress: () => removeFromCart(beerId) }
        ]
      );
      return;
    }
    updateQuantity(beerId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert(
        "Carrinho Vazio",
        "Adicione produtos ao carrinho para finalizar a compra.",
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert(
      "Compra Finalizada",
      "Sua compra foi realizada com sucesso!",
      [{ text: "OK", onPress: () => clearCart() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.beer.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image 
              source={{ uri: item.beer.image_url ?? undefined }} 
              style={styles.image} 
            />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.beer.name}</Text>
              <Text style={styles.price}>R$ {item.beer.price.toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.beer.id, item.quantity, -1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.beer.id, item.quantity, 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.subtotal}>
                Subtotal: R$ {(item.beer.price * item.quantity).toFixed(2)}
              </Text>
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
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
