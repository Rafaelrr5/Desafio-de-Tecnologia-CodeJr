import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BeerManagementScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gerenciar Cervejas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default BeerManagementScreen;