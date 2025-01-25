import React from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, View } from 'react-native';
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <ThemedView style={styles.innerContainer}>
            {/* Seção: Cervejas em Destaque */}
            <ThemedText type="title" style={styles.title}>Cervejas em Destaque</ThemedText>
            <FlatList
              horizontal
              data={featuredBeers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.beerCard}>
                  <Image source={{ uri: item.image }} style={styles.beerImage} />
                  <ThemedText type="default" style={styles.beerName}>{item.name}</ThemedText>
                  <ThemedText type="subtitle" style={styles.beerType}>{item.type}</ThemedText>
                  <ThemedText type="default" style={styles.beerPrice}>{item.price}</ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.beerList}
            />

            {/* Seção: Promoções */}
            <ThemedText type="title" style={styles.sectionTitle}>Promoções</ThemedText>
            <FlatList
              data={promotions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.promotionCard}>
                  <Image source={{ uri: item.image }} style={styles.promotionImage} />
                  <View style={styles.promotionTextContainer}>
                    <ThemedText type="defaultSemiBold" style={styles.promotionTitle}>{item.title}</ThemedText>
                    <ThemedText type="default" style={styles.promotionDescription}>{item.description}</ThemedText>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.promotionList}
            />

            {/* Seção: Mais Vendidas */}
            <ThemedText type="title" style={styles.sectionTitle}>Mais Vendidas</ThemedText>
            <FlatList
              horizontal
              data={bestSellers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.beerCard}>
                  <Image source={{ uri: item.image }} style={styles.beerImage} />
                  <ThemedText type="default" style={styles.beerName}>{item.name}</ThemedText>
                  <ThemedText type="subtitle" style={styles.beerType}>{item.type}</ThemedText>
                  <ThemedText type="default" style={styles.beerPrice}>{item.price}</ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.beerList}
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
    backgroundColor: colors.background, // Fundo bege claro
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.textDark, // Texto marrom escuro
  },
  beerList: {
    paddingBottom: 16,
  },
  beerCard: {
    width: 150,
    marginRight: 16,
    alignItems: 'center',
    backgroundColor: colors.secondary, // Fundo marrom claro
    borderRadius: 8,
    padding: 8,
  },
  beerImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  beerName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textDark, // Texto marrom escuro
  },
  beerType: {
    fontSize: 14,
    color: colors.textDark, // Texto marrom escuro
    textAlign: 'center',
  },
  beerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary, // Texto laranja
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    color: colors.textDark, // Texto marrom escuro
  },
  promotionList: {
    paddingBottom: 16,
  },
  promotionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.secondary, // Fundo marrom claro
    borderRadius: 8,
    overflow: 'hidden',
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
    marginBottom: 8,
    color: colors.textDark, // Texto marrom escuro
  },
  promotionDescription: {
    fontSize: 14,
    color: colors.textDark, // Texto marrom escuro
  },
});

export default HomeScreen;