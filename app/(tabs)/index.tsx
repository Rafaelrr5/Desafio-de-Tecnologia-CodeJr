import React from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

// Cores da paleta
const colors = {
  primary: '#de9606', // Laranja
  secondary: '#aa8c66', // Marrom claro
  background: '#fff8ec', // Bege claro
  textDark: '#402e32', // Marrom escuro
};

// Dados de exemplo para cervejas em destaque
const featuredBeers = [
  {
    id: 1,
    name: 'IPA',
    type: 'India Pale Ale',
    price: 'R$ 15,00',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  {
    id: 2,
    name: 'Stout',
    type: 'Stout',
    price: 'R$ 18,00',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  {
    id: 3,
    name: 'Pilsen',
    type: 'Pilsner',
    price: 'R$ 12,00',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  {
    id: 4,
    name: 'Weiss',
    type: 'Trigo',
    price: 'R$ 14,00',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
];

// Dados de exemplo para promoções
const promotions = [
  {
    id: 1,
    title: 'Promoção de Verão',
    description: 'Desconto de 20% em todas as cervejas artesanais!',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  {
    id: 2,
    title: 'Happy Hour',
    description: 'Todas as sextas-feiras, cervejas pela metade do preço!',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
];

// Dados de exemplo para as cervejas mais vendidas
const bestSellers = [
  {
    id: 1,
    name: 'IPA Artesanal',
    type: 'India Pale Ale',
    price: 'R$ 16,00',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  {
    id: 2,
    name: 'Stout Negra',
    type: 'Stout',
    price: 'R$ 19,00',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
  {
    id: 3,
    name: 'Pilsen Premium',
    type: 'Pilsner',
    price: 'R$ 13,00',
    image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Imagem de fundo */}
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
        }}
        style={styles.backgroundImage}
      />
      {/* Sobreposição */}
      <View style={styles.overlay} />
      <FlatList
        data={[]}
        ListHeaderComponent={
          <ThemedView style={styles.innerContainer}>
            {/* Seções */}
            <ThemedText type="title" style={styles.title}>Cervejas em Destaque</ThemedText>
            <FlatList
              horizontal
              data={featuredBeers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.beerCard}
                  onPress={() => router.push({
                    pathname: "/BeerDetailsModal",
                    params: { id: item.id }
                  })}
                >
                  <Image source={{ uri: item.image }} style={styles.beerImage} />
                  <ThemedText style={styles.beerName}>{item.name}</ThemedText>
                  <ThemedText style={styles.beerType}>{item.type}</ThemedText>
                  <ThemedText style={styles.beerPrice}>{item.price}</ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.beerList}
            />

            <ThemedText type="title" style={styles.sectionTitle}>Promoções</ThemedText>
            <FlatList
              data={promotions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.promotionCard}>
                  <Image source={{ uri: item.image }} style={styles.promotionImage} />
                  <View style={styles.promotionTextContainer}>
                    <ThemedText style={styles.promotionTitle}>{item.title}</ThemedText>
                    <ThemedText style={styles.promotionDescription}>{item.description}</ThemedText>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.promotionList}
            />
          </ThemedView>
        }
        renderItem={null}
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 236, 0.85)', // Sobreposição translúcida
  },
  innerContainer: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
  },
  beerList: {
    paddingBottom: 16,
  },
  beerCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#f7e4d4',
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
  },
  beerImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginBottom: 12,
  },
  beerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlign: 'center',
  },
  beerType: {
    fontSize: 14,
    color: '#6d5d58',
    textAlign: 'center',
    marginVertical: 4,
  },
  beerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textDark,
    marginVertical: 20,
  },
  promotionCard: {
    flexDirection: 'row',
    backgroundColor: '#ead8c3',
    borderRadius: 12,
    marginBottom: 16,
  },
  promotionImage: {
    width: 100,
    height: 100,
  },
  promotionTextContainer: {
    flex: 1,
    padding: 12,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  promotionList: {
    paddingBottom: 16,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#6d5d58',
  },
});

export default HomeScreen;