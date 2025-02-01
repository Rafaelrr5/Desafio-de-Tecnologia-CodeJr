import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Beer {
  id: string;
  name: string;
  type: string;
  description: string;
  alcohol: number;
  price: number;
  stock: number;
  imageUrl: string;
  ibu: number;          // International Bitterness Units
  temperature: number;  // Temperatura ideal de serviço
  color: string;       // Cor da cerveja (EBC - European Brewery Convention)
  origin: string;      // País/Região de origem
  brewery: string;     // Cervejaria
  volume: number;      // Volume em ml
}

const mockBeers: Beer[] = [
  {
    id: '1',
    name: 'IPA Tropical',
    type: 'India Pale Ale',
    description: 'Cerveja artesanal com notas cítricas e tropicais, apresentando um perfil aromático intenso de frutas tropicais e lúpulo.',
    alcohol: 6.2,
    price: 22.90,
    stock: 48,
    imageUrl: 'https://example.com/ipa.jpg',
    ibu: 65,
    temperature: 5,
    color: 'Âmbar - 12 EBC',
    origin: 'Brasil',
    brewery: 'Cervejaria Artesanal Bros',
    volume: 500,
  },
  {
    id: '2',
    name: 'Stout Imperial',
    type: 'Imperial Stout',
    description: 'Cerveja escura com notas intensas de café, chocolate amargo e maltes torrados. Final complexo e aquecido.',
    alcohol: 8.5,
    price: 28.90,
    stock: 32,
    imageUrl: 'https://example.com/stout.jpg',
    ibu: 45,
    temperature: 8,
    color: 'Preta - 80 EBC',
    origin: 'Brasil',
    brewery: 'Cervejaria Dark Arts',
    volume: 500,
  },
  {
    id: '3',
    name: 'Pilsen Classic',
    type: 'Pilsner',
    description: 'Cerveja leve e refrescante com maltes claros selecionados. Sabor limpo e final crocante.',
    alcohol: 4.8,
    price: 18.90,
    stock: 120,
    imageUrl: 'https://example.com/pilsen.jpg',
    ibu: 20,
    temperature: 3,
    color: 'Dourada - 6 EBC',
    origin: 'Brasil',
    brewery: 'Cervejaria Traditional',
    volume: 500,
  },
];

const BeerManagement = () => {
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
          <Text style={styles.title}>Gerenciamento de Cervejas</Text>
        </View>

        {mockBeers.map((beer) => (
          <Card key={beer.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{beer.name}</Text>
              <Text style={styles.beerType}>{beer.type}</Text>
              <Text style={styles.description}>{beer.description}</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Teor Alcoólico</Text>
                  <Text style={styles.detailText}>{beer.alcohol}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>IBU</Text>
                  <Text style={styles.detailText}>{beer.ibu}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Temperatura</Text>
                  <Text style={styles.detailText}>{beer.temperature}°C</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Volume</Text>
                  <Text style={styles.detailText}>{beer.volume}ml</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Cor</Text>
                  <Text style={styles.detailText}>{beer.color}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Cervejaria</Text>
                  <Text style={styles.detailText}>{beer.brewery}</Text>
                </View>
              </View>
              <View style={styles.priceStock}>
                <Text style={styles.price}>R$ {beer.price.toFixed(2)}</Text>
                <Text style={styles.stock}>Estoque: {beer.stock} un</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained"
                buttonColor="#de9606"
                textColor="#fff"
                onPress={() => console.log('Editar', beer.id)}
              >
                Editar
              </Button>
              <Button 
                mode="contained"
                buttonColor="#D9534F"
                textColor="#fff"
                onPress={() => console.log('Excluir', beer.id)}
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
        onPress={() => console.log('Add new beer')}
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
    backgroundColor: '#fff8ec',
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
    padding: 4,
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
  beerType: {
    fontSize: 16,
    color: '#6d5d58',
    marginBottom: 8,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 12,
  },
  detailItem: {
    width: '50%',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6d5d58',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#6A3805',
    fontWeight: '500',
  },
  priceStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#de9606',
  },
  stock: {
    fontSize: 14,
    color: '#6d5d58',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#de9606',
  },
});

export default BeerManagement;
