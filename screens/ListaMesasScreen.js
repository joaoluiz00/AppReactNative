import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Button, FAB, Portal, Modal, TextInput } from 'react-native-paper';
import api from '../services/api';
import axios from 'axios';

const ListaMesasScreen = () => {
  const [mesas, setMesas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [novaMesa, setNovaMesa] = useState({
    numero_mesa: '',
    capacidade: ''
  });

  useEffect(() => {
    carregarMesas();
  }, []);

  const carregarMesas = async () => {
    try {
      const response = await api.get('/mesas');
      setMesas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const alterarDisponibilidade = async (id, disponivel) => {
    try {
      await api.put(`/mesas/${id}`, { disponivel: !disponivel });
      carregarMesas();
    } catch (error) {
      console.error(error);
    }
  };

  const cadastrarMesa = async () => {
    try {
      await api.post('/mesas', novaMesa);
      setVisible(false);
      carregarMesas();
      alert('Mesa cadastrada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar mesa');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mesas}
        keyExtractor={(item) => item.id_mesa.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Mesa {item.numero_mesa}</Title>
              <Title>Capacidade: {item.capacidade} pessoas</Title>
            </Card.Content>
            <Card.Actions>
              <Button
                mode={item.disponivel ? "contained" : "outlined"}
                onPress={() => alterarDisponibilidade(item.id_mesa, item.disponivel)}
              >
                {item.disponivel ? 'Disponível' : 'Ocupada'}
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View style={styles.modal}>
            <TextInput
              label="Número da Mesa"
              value={novaMesa.numero_mesa}
              onChangeText={text => setNovaMesa({ ...novaMesa, numero_mesa: text })}
              keyboardType="numeric"
            />
            <TextInput
              label="Capacidade"
              value={novaMesa.capacidade}
              onChangeText={text => setNovaMesa({ ...novaMesa, capacidade: text })}
              keyboardType="numeric"
            />
            <Button mode="contained" onPress={cadastrarMesa}>
              Cadastrar
            </Button>
          </View>
        </Modal>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default ListaMesasScreen;