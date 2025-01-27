import React from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Cores da paleta
const colors = {
  primary: '#de9606', // Laranja
  secondary: '#aa8c66', // Marrom claro
  background: '#fff8ec', // Bege claro
  textDark: '#402e32', // Marrom escuro
};

// Dados de exemplo para o carrinho
const cartItems = [
  {
    id: 1,
    name: 'IPA',
    type: 'India Pale Ale',
    price: 'R$ 15,00',
    quantity: 2,
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  {
    id: 2,
    name: 'Stout',
    type: 'Stout',
    price: 'R$ 18,00',
    quantity: 1,
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
];

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=' }}
        style={styles.backgroundImage}
      />
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ThemedView style={styles.innerContainer}>
            <ThemedText type="title" style={styles.title}>Meu Carrinho</ThemedText>
          </ThemedView>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <ThemedText style={styles.cartItemName}>{item.name}</ThemedText>
              <ThemedText style={styles.cartItemType}>{item.type}</ThemedText>
              <ThemedText style={styles.cartItemPrice}>{item.price}</ThemedText>
              <ThemedText style={styles.cartItemQuantity}>Quantidade: {item.quantity}</ThemedText>
            </View>
            <TouchableOpacity style={styles.removeButton}>
              <ThemedText style={styles.removeButtonText}>Remover</ThemedText>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <ThemedText style={styles.totalText}>Total: R$ 48,00</ThemedText>
            <TouchableOpacity style={styles.checkoutButton}>
              <ThemedText style={styles.checkoutButtonText}>Finalizar Compra</ThemedText>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f7e4d4', // Bege suave
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    padding: 12,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  cartItemType: {
    fontSize: 14,
    color: '#6d5d58',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: colors.textDark,
  },
  removeButton: {
    alignSelf: 'center',
    padding: 8,
    backgroundColor: '#de9606',
    borderRadius: 8,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
});

export default CartScreen;
