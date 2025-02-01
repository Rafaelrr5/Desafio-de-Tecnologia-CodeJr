import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  isActive: boolean;
}

const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Happy Hour - 2x1',
    description: 'Compre uma cerveja e leve outra grátis',
    discount: 50,
    validUntil: '2024-02-28',
    isActive: true,
  },
  {
    id: '2',
    title: 'Desconto Especial',
    description: 'Todas as cervejas artesanais com 30% OFF',
    discount: 30,
    validUntil: '2024-03-15',
    isActive: true,
  },
  {
    id: '3',
    title: 'Promoção de Verão',
    description: 'Cervejas geladas com 25% de desconto',
    discount: 25,
    validUntil: '2024-03-30',
    isActive: false,
  },
  {
    id: '4',
    title: 'Dia de Pagode',
    description: 'Todo domingo: Cervejas com 20% de desconto durante o pagode ao vivo',
    discount: 20,
    validUntil: '2024-12-31',
    isActive: true,
  },
];

const PromotionManagement = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#6A3805" />
          </TouchableOpacity>
          <Text style={styles.title}>Gerenciamento de Promoções</Text>
        </View>

        {mockPromotions.map((promo) => (
          <Card key={promo.id} style={styles.card}>
            <Card.Content>
              <View style={styles.promoHeader}>
                <Text style={styles.cardTitle}>{promo.title}</Text>
                <Text style={[styles.status, { color: promo.isActive ? '#de9606' : '#D9534F' }]}>
                  {promo.isActive ? 'Ativa' : 'Inativa'}
                </Text>
              </View>
              <Text style={styles.description}>{promo.description}</Text>
              <Text style={styles.details}>Desconto: {promo.discount}%</Text>
              <Text style={styles.details}>Válido até: {promo.validUntil}</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                buttonColor="#de9606"
                textColor="#fff"
                onPress={() => console.log('Editar', promo.id)}
              >
                Editar
              </Button>
              <Button 
                mode="contained"
                buttonColor="#D9534F"
                textColor="#fff"
                onPress={() => console.log('Excluir', promo.id)}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={() => console.log('Add new promotion')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#de9606',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6d5d58',
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  details: {
    fontSize: 14,
    color: '#6d5d58',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#de9606',
  },
});

export default PromotionManagement;
