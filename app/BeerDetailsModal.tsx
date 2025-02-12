import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { api } from '@/services/api';
import { Beer } from '../types/beer';
import { useCart } from '@/contexts/cartContext';
import { styles } from '@/styles/BeerDetailsModal.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = SCREEN_HEIGHT * 0.3;

const DEFAULT_BEER_IMAGE = 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=';

export default function BeerDetailsModal() {
  const params = useLocalSearchParams();
  const beerId = params.id as string;
  const [beer, setBeer] = useState<Beer | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const translateY = useSharedValue(0);
  const { addToCart } = useCart();
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    /*
     Carrega os detalhes da cerveja a partir do ID,
     Atualiza o estado com os dados recebidos da API e
     Usa uma imagem padrão caso a cerveja não tenha imagem
     */
    async function loadBeer() {
      if (!beerId) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.getBeerById(beerId);
        if (data) {
          setBeer({
            ...data,
            image: data.image || DEFAULT_BEER_IMAGE
          });
        }
      } catch (error) {
        // Tratamento silencioso do erro
      } finally {
        setLoading(false);
      }
    }
    loadBeer();
  }, [beerId]);

  /*
   Gerencia o gesto de arrastar para baixo
   Permite fechar o modal quando o usuário arrasta além do limite
   */
  const closeModal = () => {
    if (!isDismissing) {
      setIsDismissing(true);
      router.back();
    }
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > DISMISS_THRESHOLD) {
        runOnJS(closeModal)();
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 90
        });
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (!beer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Cerveja não encontrada</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    if (beer) {
      addToCart(beer, quantity);
      router.back();
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rStyle]}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={closeModal}
          >
            <Ionicons name="close" size={24} color="#6A3805" />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={true}
            bounces={false}
            scrollEventThrottle={16}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <Image 
              source={{ 
                uri: beer.image_url || DEFAULT_BEER_IMAGE,
                cache: 'reload'
              }} 
              style={styles.beerImage}
              onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
            />
        
            <View style={styles.content}>
              <Text style={styles.title}>{beer.name}</Text>
              <Text style={styles.type}>{beer.type}</Text>
              <Text style={styles.description}>{beer.description || 'Sem descrição disponível'}</Text>

              <View style={styles.detailsGrid}>
                <DetailItem label="Teor Alcoólico" value={`${beer.alcohol}%`} />
                <DetailItem label="IBU" value={beer.ibu?.toString() || 'N/A'} />
                <DetailItem label="Temperatura" value={beer.temperature ? `${beer.temperature}°C` : 'N/A'} />
                <DetailItem label="Volume" value={beer.volume ? `${beer.volume}ml` : 'N/A'} />
                <DetailItem label="Cervejaria" value={beer.brewery || 'N/A'} />
              </View>

              <View style={styles.footer}>
                <View style={styles.footerActions}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                  >
                    <Text style={styles.addToCartText}>Adicionar</Text>
                  </TouchableOpacity>
                  <Text style={styles.price}>
                    R$ {(beer.price * quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);
