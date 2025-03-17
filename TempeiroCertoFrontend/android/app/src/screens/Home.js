import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

const Home = ({ navigation }) => {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true); // Adiciona estado de carregamento

  useEffect(() => {
    const carregarReceitas = async () => {
      try {
        const resposta = await api.get('/receitas');
        setReceitas(resposta.data);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      } finally {
        setLoading(false); // Define carregamento como falso após a conclusão
      }
    };
    carregarReceitas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando receitas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={receitas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Receita', { id: item._id })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nome: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;