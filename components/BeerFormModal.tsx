import React, { useState, useEffect } from 'react';
import { View, Modal, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { supabase } from '@/lib/supabase';
import { styles } from '@/styles/BeerFormModal.styles';
import { Beer } from '@/types/beer';

const DEFAULT_BEER_IMAGE = 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=';

interface BeerFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (beer: Partial<Beer>) => Promise<void>;
  initialData?: Beer;
}

export const BeerFormModal = ({ visible, onClose, onSave, initialData }: BeerFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: 'Cerveja artesanal premium',
    alcohol: '4.5',
    price: '',
    stock: '',
    ibu: '20',
    temperature: '',
    volume: '355',
    brewery: 'Cervejaria Local',
    image_url: '',
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type || '',
        description: initialData.description || 'Cerveja artesanal premium',
        alcohol: initialData.alcohol?.toString() || '4.5',
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        ibu: initialData.ibu?.toString() || '20',
        temperature: initialData.temperature?.toString() || '',
        volume: initialData.volume?.toString() || '355',
        brewery: initialData.brewery || 'Cervejaria Local',
        image_url: initialData.image_url || '',
        is_active: initialData.is_active ?? true,
      });
    } else {
      setFormData({
        name: '',
        type: '',
        description: 'Cerveja artesanal premium',
        alcohol: '4.5',
        price: '',
        stock: '',
        ibu: '20',
        temperature: '',
        volume: '355',
        brewery: 'Cervejaria Local',
        image_url: '',
        is_active: true,
      });
    }
  }, [initialData, visible]);

  // Função para fazer upload da imagem selecionada
  const uploadImage = async (uri: string) => {
    try {
      const filename = `beer-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const fileExt = uri.split('.').pop();
      const filePath = `beers/${filename}.${fileExt}`;

      const response = await fetch(uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase
        .storage
        .from('beer-images')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase
        .storage
        .from('beer-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer upload da imagem');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar a cerveja (nova ou editada)
  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.stock || !formData.type || !formData.alcohol) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      const beerData = {
        name: formData.name,
        type: formData.type,
        description: formData.description || null,
        alcohol: parseFloat(formData.alcohol),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        ibu: formData.ibu ? parseInt(formData.ibu) : null,
        temperature: formData.temperature ? parseInt(formData.temperature) : null,
        volume: formData.volume ? parseInt(formData.volume) : null,
        brewery: formData.brewery || null,
        image_url: formData.image_url || DEFAULT_BEER_IMAGE,
        is_active: formData.is_active,
      };

      await onSave(initialData ? { ...beerData, id: initialData.id } : beerData);
      onClose();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar cerveja');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.centeredView} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.modalView} 
          activeOpacity={1} 
          onPress={e => e.stopPropagation()}
        >
          <Text style={styles.modalTitle}>
            {initialData ? 'Editar Cerveja' : 'Nova Cerveja'}
          </Text>

          <ScrollView style={styles.scrollView}>
            <TextInput
              label="Nome *"
              value={formData.name}
              onChangeText={text => setFormData(prev => ({ ...prev, name: text }))}
              style={styles.input}
              theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
            />
            <TextInput
              label="Tipo *"
              value={formData.type}
              onChangeText={text => setFormData(prev => ({ ...prev, type: text }))}
              style={styles.input}
              theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
            />
            <TextInput
              label="Preço *"
              value={formData.price}
              onChangeText={text => setFormData(prev => ({ ...prev, price: text }))}
              keyboardType="decimal-pad"
              style={styles.input}
              theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
            />
            <TextInput
              label="Estoque *"
              value={formData.stock}
              onChangeText={text => setFormData(prev => ({ ...prev, stock: text }))}
              keyboardType="number-pad"
              style={styles.input}
              theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
            />

            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={showAdvanced ? 'checked' : 'unchecked'}
                onPress={() => setShowAdvanced(!showAdvanced)}
                color="#de9606"
              />
              <Text 
                onPress={() => setShowAdvanced(!showAdvanced)}
                style={styles.checkboxText}
              >
                Informações Avançadas
              </Text>
            </View>

            {showAdvanced && (
              <>
                <TextInput
                  label="Descrição"
                  value={formData.description}
                  onChangeText={text => setFormData(prev => ({ ...prev, description: text }))}
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
                />
                <TextInput
                  label="Teor Alcoólico (%) *"
                  value={formData.alcohol}
                  onChangeText={text => setFormData(prev => ({ ...prev, alcohol: text }))}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
                />
                <TextInput
                  label="IBU"
                  value={formData.ibu}
                  onChangeText={text => setFormData(prev => ({ ...prev, ibu: text }))}
                  keyboardType="number-pad"
                  style={styles.input}
                  theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
                />
                <TextInput
                  label="Temperatura (°C)"
                  value={formData.temperature}
                  onChangeText={text => setFormData(prev => ({ ...prev, temperature: text }))}
                  keyboardType="number-pad"
                  style={styles.input}
                  theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
                />
                <TextInput
                  label="Volume (ml)"
                  value={formData.volume}
                  onChangeText={text => setFormData(prev => ({ ...prev, volume: text }))}
                  keyboardType="number-pad"
                  style={styles.input}
                  theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
                />
                <TextInput
                  label="Cervejaria"
                  value={formData.brewery}
                  onChangeText={text => setFormData(prev => ({ ...prev, brewery: text }))}
                  style={styles.input}
                  theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
                />
              </>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              buttonColor="#de9606"
              textColor="#fff"
              loading={loading}
            >
              Salvar
            </Button>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.button}
              textColor="#6A3805"
            >
              Cancelar
            </Button>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
