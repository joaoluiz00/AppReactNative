import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import api from '../services/api';

const CadastroClienteScreen = ({ navigation }) => {
  const [cliente, setCliente] = useState({
    nome_cliente: '',
    telefone: '',
    email: '',
  });

  const cadastrarCliente = async () => {
    try {
      await api.post('/clientes', cliente);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        value={cliente.nome_cliente}
        onChangeText={(text) => setCliente({ ...cliente, nome_cliente: text })}
        style={styles.input}
      />
      <TextInput
        label="Telefone"
        value={cliente.telefone}
        onChangeText={(text) => setCliente({ ...cliente, telefone: text })}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={cliente.email}
        onChangeText={(text) => setCliente({ ...cliente, email: text })}
        style={styles.input}
      />
      <Button mode="contained" onPress={cadastrarCliente}>
        Cadastrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default CadastroClienteScreen;