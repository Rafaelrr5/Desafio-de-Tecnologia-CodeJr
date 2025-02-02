import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

const DEFAULT_BEER_IMAGE = 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=';

interface BeerFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (beer: Partial<Beer>) => Promise<void>;
  initialData?: Beer;
}

export const BeerFormModal = ({ visible, onClose, onSave, initialData }: BeerFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    alcohol: '',
    price: '',
    stock: '',
    ibu: '',
    temperature: '',
    volume: '',
    brewery: '',
    image_url: '',
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type || '',
        description: initialData.description || '',
        alcohol: initialData.alcohol?.toString() || '',
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        ibu: initialData.ibu?.toString() || '',
        temperature: initialData.temperature?.toString() || '',
        volume: initialData.volume?.toString() || '',
        brewery: initialData.brewery || '',
        image_url: initialData.image_url || '',
        is_active: initialData.is_active ?? true,
      });
    } else {
      setFormData({
        name: '',
        type: '',
        description: '',
        alcohol: '',
        price: '',
        stock: '',
        ibu: '',
        temperature: '',
        volume: '',
        brewery: '',
        image_url: '',
        is_active: true,
      });
    }
  }, [initialData, visible]);

  // Função para selecionar uma imagem da galeria
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Erro', 'Precisamos de permissão para acessar suas fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  // Função para fazer upload da imagem selecionada
  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);
      const filename = uri.split('/').pop();
      const response = await fetch(uri);
      const blob = await response.blob();
      const filePath = `beers/${Date.now()}-${filename}`;
      
      const { error: uploadError, data } = await supabase
        .storage
        .from('images')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl })); // Update to use image_url
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
            {initialData ? (
              // Edit mode - single column layout
              <>
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
                  label="Descrição"
                  value={formData.description}
                  onChangeText={text => setFormData(prev => ({ ...prev, description: text }))}
                  multiline
                  numberOfLines={3}
                  style={styles.input}
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
                <TextInput
                  label="Cervejaria"
                  value={formData.brewery}
                  onChangeText={text => setFormData(prev => ({ ...prev, brewery: text }))}
                  style={styles.input}
                  theme={{ colors: { primary: '#de9606', placeholder: '#6A3805' } }}
                />
              </>
            ) : (
              // Create mode - single column layout
              <>
                <TextInput
                  label="Nome"
                  value={formData.name}
                  onChangeText={text => setFormData(prev => ({ ...prev, name: text }))}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: '#de9606',
                      placeholder: '#6A3805',
                    }
                  }}
                />
                <TextInput
                  label="Preço"
                  value={formData.price}
                  onChangeText={text => setFormData(prev => ({ ...prev, price: text }))}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: '#de9606',
                      placeholder: '#6A3805',
                    }
                  }}
                />
                <TextInput
                  label="Estoque"
                  value={formData.stock}
                  onChangeText={text => setFormData(prev => ({ ...prev, stock: text }))}
                  keyboardType="number-pad"
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: '#de9606',
                      placeholder: '#6A3805',
                    }
                  }}
                />
              </>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={pickImage}
              style={[styles.button, styles.imageButton]}
              buttonColor="#de9606"
              textColor="#fff"
              loading={loading}
            >
              Selecionar Imagem
            </Button>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 56, 5, 0.3)',
  },
  modalView: {
    width: '95%',
    height: '90%',
    backgroundColor: '#fff8ec',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(106, 56, 5, 0.1)',
  },
  button: {
    marginTop: 8,
    borderColor: '#6A3805',
  },
  imageButton: {
    marginTop: 16,
    marginBottom: 8,
  },
  additionalParams: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fullWidth: {
    marginHorizontal: 8,
    marginBottom: 12,
  },
});
