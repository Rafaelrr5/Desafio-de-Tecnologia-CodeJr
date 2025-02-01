import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

interface Beer {
  id: number;
  name: string;
  type: string;
  description: string;
  alcohol: number;
  price: number;
  ibu: number;
  temperature: number;
  color: string;
  brewery: string;
  volume: number;
  image: string;
}

const mockBeers: Record<number, Beer> = {
  1: {
    id: 1,
    name: 'IPA',
    type: 'India Pale Ale',
    description: 'Cerveja artesanal com notas cítricas e tropicais',
    alcohol: 6.2,
    price: 15.00,
    ibu: 65,
    temperature: 5,
    color: 'Âmbar - 12 EBC',
    brewery: 'Cervejaria Artesanal Bros',
    volume: 500,
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  // ... adicione outros objetos de cerveja aqui
};

export default function BeerDetailsModal() {
  const params = useLocalSearchParams();
  const beerId = Number(params.id);
  const beer = mockBeers[beerId];

  if (!beer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Cerveja não encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#6A3805" />
        </TouchableOpacity>

        <Image source={{ uri: beer.image }} style={styles.beerImage} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{beer.name}</Text>
          <Text style={styles.type}>{beer.type}</Text>
          <Text style={styles.description}>{beer.description}</Text>

          <View style={styles.detailsGrid}>
            <DetailItem label="Teor Alcoólico" value={`${beer.alcohol}%`} />
            <DetailItem label="IBU" value={beer.ibu.toString()} />
            <DetailItem label="Temperatura" value={`${beer.temperature}°C`} />
            <DetailItem label="Volume" value={`${beer.volume}ml`} />
            <DetailItem label="Cor" value={beer.color} />
            <DetailItem label="Cervejaria" value={beer.brewery} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.price}>R$ {beer.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
  },
  beerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    color: '#6d5d58',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#6d5d58',
    marginBottom: 24,
    lineHeight: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  detailItem: {
    width: '50%',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6d5d58',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#6A3805',
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
    marginTop: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#de9606',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#de9606',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
