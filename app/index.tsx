import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import { usePromotions } from '../contexts/promotionContext';
import { styles } from '../styles/Index.styles';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  isActive: boolean;
}

export default function Index() {
  const { getActivePromotions, loading, error, fetchPromotions } = usePromotions();

  useEffect(() => {
    fetchPromotions();
  }, []);

  const activePromotions = getActivePromotions();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Promoções Ativas</Text>
        {activePromotions.map((promo) => (
          <Card key={promo.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{promo.title}</Text>
              <Text style={styles.description}>{promo.description}</Text>
              <Text style={styles.discount}>Desconto: {promo.discount}%</Text>
              <Text style={styles.validUntil}>Válido até: {promo.validUntil}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
