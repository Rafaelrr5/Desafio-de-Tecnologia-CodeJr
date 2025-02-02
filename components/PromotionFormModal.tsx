import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface PromotionFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (promotion: Partial<Promotion>) => Promise<void>;
  initialData?: Promotion;
}

export const PromotionFormModal = ({ visible, onClose, onSave, initialData }: PromotionFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: new Date(),
    isActive: true,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        discount: initialData.discount.toString(),
        validUntil: new Date(initialData.validUntil),
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        discount: '',
        validUntil: new Date(),
        isActive: true,
      });
    }
  }, [initialData, visible]);

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.discount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await onSave({
        title: formData.title,
        description: formData.description,
        discount: parseFloat(formData.discount),
        validUntil: formData.validUntil.toISOString(),
        isActive: formData.isActive,
      });
      onClose();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar promoção');
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalTitle}>
              {initialData ? 'Editar Promoção' : 'Nova Promoção'}
            </Text>
            <TextInput
              label="Título"
              value={formData.title}
              onChangeText={text => setFormData(prev => ({ ...prev, title: text }))}
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <TextInput
              label="Descrição"
              value={formData.description}
              onChangeText={text => setFormData(prev => ({ ...prev, description: text }))}
              multiline
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <TextInput
              label="Desconto (%)"
              value={formData.discount}
              onChangeText={text => setFormData(prev => ({ ...prev, discount: text }))}
              keyboardType="decimal-pad"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
              textColor="#6A3805"
            >
              Válido até: {formData.validUntil.toLocaleDateString()}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={formData.validUntil}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setFormData(prev => ({ ...prev, validUntil: selectedDate }));
                  }
                }}
              />
            )}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Ativa</Text>
              <Switch
                value={formData.isActive}
                onValueChange={value => setFormData(prev => ({ ...prev, isActive: value }))}
                color="#de9606"
              />
            </View>
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
          </ScrollView>
        </View>
      </View>
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
    width: '90%',
    backgroundColor: '#fff8ec',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
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
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
    borderColor: '#6A3805',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#6A3805',
  },
});
