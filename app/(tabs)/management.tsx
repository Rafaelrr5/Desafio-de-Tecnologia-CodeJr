import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Item = {
  id: number;
  name: string;
  type: string;
  image: string;
};

const ManagementScreen = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: 'IPA',
      type: 'India Pale Ale',
      image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
    },
    {
      id: 2,
      name: 'Stout',
      type: 'Stout',
      image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
    },
    {
      id: 3,
      name: 'Pilsen',
      type: 'Pilsner',
      image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
    },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemType, setNewItemType] = useState<string>('');
  const [newItemImage, setNewItemImage] = useState<string>('');

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setNewItemName(item.name);
    setNewItemType(item.type);
    setNewItemImage(item.image);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (selectedItem) {
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id
          ? { ...item, name: newItemName, type: newItemType, image: newItemImage }
          : item
      );
      setItems(updatedItems);
    } else {
      const newItem = {
        id: items.length + 1,
        name: newItemName,
        type: newItemType,
        image: newItemImage,
      };
      setItems([...items, newItem]);
    }
    setModalVisible(false);
    setSelectedItem(null);
    setNewItemName('');
    setNewItemType('');
    setNewItemImage('');
  };

  return (
    <SafeAreaProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Gerenciamento de Cervejas</ThemedText>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <ThemedText type="default">{item.name}</ThemedText>
                <ThemedText type="subtitle">{item.type}</ThemedText>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <ThemedText type="link">Editar</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <ThemedText type="link" style={styles.deleteButton}>Excluir</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          )}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <ThemedText type="defaultSemiBold" style={styles.addButtonText}>Adicionar Cerveja</ThemedText>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide">
          <ThemedView style={styles.modalContainer}>
            <ThemedText type="title">{selectedItem ? 'Editar Cerveja' : 'Adicionar Cerveja'}</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo"
              value={newItemType}
              onChangeText={setNewItemType}
            />
            <TextInput
              style={styles.input}
              placeholder="URL da Imagem"
              value={newItemImage}
              onChangeText={setNewItemImage}
            />
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </ThemedView>
        </Modal>
      </ThemedView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 16,
  },
  addButton: {
    backgroundColor: '#0a7ea4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default ManagementScreen;