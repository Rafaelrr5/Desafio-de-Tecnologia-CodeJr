import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PromotionManagement = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Promoções</Text>
      <Text style={styles.description}>Gerencie as promoções e ofertas disponíveis no catálogo.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#de9606',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default PromotionManagement;
