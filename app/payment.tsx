import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { paymentStyles as styles } from '@/styles/paymentStyles';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('credit');

  const PaymentMethod = ({ title, icon, method }) => (
    <TouchableOpacity 
      style={[
        styles.paymentMethod, 
        selectedMethod === method && styles.selectedMethod
      ]}
      onPress={() => setSelectedMethod(method)}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={selectedMethod === method ? '#fff' : '#6A3805'} 
      />
      <ThemedText style={[
        styles.methodText,
        selectedMethod === method && styles.selectedMethodText
      ]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Pagamento" />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Método de Pagamento</ThemedText>
          <View style={styles.methodsContainer}>
            <PaymentMethod 
              title="Cartão de Crédito" 
              icon="card" 
              method="credit"
            />
            <PaymentMethod 
              title="PIX" 
              icon="cash" 
              method="pix"
            />
            <PaymentMethod 
              title="Boleto" 
              icon="barcode" 
              method="boleto"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
