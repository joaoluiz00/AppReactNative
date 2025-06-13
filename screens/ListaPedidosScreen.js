import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Portal, Modal, TextInput, List } from 'react-native-paper';
import api from '../services/api';
import axios from 'axios';

const ListaPedidosScreen = ({ navigation }) => {
  const [pedidos, setPedidos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pratos, setPratos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({
    id_cliente: '',
    id_mesa: '',
    itens: []
  });
  const [pratoSelecionado, setPratoSelecionado] = useState({
    id_prato: '',
    quantidade: '',
    preco_unitario: ''
  });

  useEffect(() => {
    carregarPedidos();
    carregarPratos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const response = await api.get('/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const carregarPratos = async () => {
    try {
      const response = await api.get('/pratos');
      setPratos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pratos:', error);
    }
  };

  const atualizarStatus = async (id, novoStatus) => {
    try {
        console.log(`Atualizando pedido - ID: ${id}, Novo Status: ${novoStatus}`);
        
        if (!id) {
            throw new Error('ID do pedido inválido');
        }

        // Usando axios diretamente para debug
        const response = await axios.put(`http://localhost:3000/api/pedidos/${id}/status`, {
            status_pedido: novoStatus
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Resposta:', response.data);

        if (response.data) {
            await carregarPedidos();
            alert(`Status do pedido atualizado para: ${novoStatus}`);
        }
    } catch (error) {
        console.error('Erro completo:', {
            url: `http://localhost:3000/api/pedidos/${id}`,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        
        if (error.response?.status === 404) {
            alert('Pedido não encontrado. Verifique se o ID existe no banco.');
        } else {
            alert(`Erro na atualização: ${error.message}`);
        }
    }
  };

  const adicionarItem = () => {
    if (!pratoSelecionado.id_prato || !pratoSelecionado.quantidade) {
      alert('Selecione um prato e informe a quantidade');
      return;
    }

    setNovoPedido({
      ...novoPedido,
      itens: [...novoPedido.itens, pratoSelecionado]
    });

    setPratoSelecionado({
      id_prato: '',
      quantidade: '',
      preco_unitario: ''
    });
  };

  const cadastrarPedido = async () => {
    try {
      if (!novoPedido.id_cliente || !novoPedido.id_mesa || novoPedido.itens.length === 0) {
        alert('Preencha todos os campos e adicione pelo menos um item');
        return;
      }

      const pedidoFormatado = {
        id_cliente: parseInt(novoPedido.id_cliente),
        id_mesa: parseInt(novoPedido.id_mesa),
        itens: novoPedido.itens.map(item => ({
          id_prato: parseInt(item.id_prato),
          quantidade: parseInt(item.quantidade),
          preco_unitario: parseFloat(item.preco_unitario)
        }))
      };

      console.log('Enviando pedido:', pedidoFormatado);

      const response = await api.post('/pedidos', pedidoFormatado);
      
      if (response.data) {
        setVisible(false);
        await carregarPedidos();
        setNovoPedido({
          id_cliente: '',
          id_mesa: '',
          itens: []
        });
        alert('Pedido cadastrado com sucesso!');
      }
    } catch (error) {
      console.error('Erro detalhado:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: error.config?.data
      });
      
      if (error.response?.status === 500) {
        alert('Erro interno do servidor. Verifique se os IDs de cliente e mesa existem.');
      } else {
        alert(`Erro ao cadastrar pedido: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id_pedido.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Pedido #{item.id_pedido}</Title>
              <Paragraph>Mesa: {item.numero_mesa}</Paragraph>
              <Paragraph>Status: {item.status_pedido}</Paragraph>
              <Paragraph>Data: {new Date(item.data_pedido).toLocaleString()}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained"
                onPress={() => atualizarStatus(item.id_pedido, 'em_andamento')}
                disabled={item.status_pedido === 'em_andamento'}>
                Em Andamento
              </Button>
              <Button 
                mode="contained"
                onPress={() => atualizarStatus(item.id_pedido, 'concluido')}
                disabled={item.status_pedido === 'concluido'}>
                Concluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <ScrollView style={styles.modalContent}>
            <TextInput
              label="ID do Cliente"
              value={novoPedido.id_cliente}
              onChangeText={text => setNovoPedido({...novoPedido, id_cliente: text})}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="ID da Mesa"
              value={novoPedido.id_mesa}
              onChangeText={text => setNovoPedido({...novoPedido, id_mesa: text})}
              keyboardType="numeric"
              style={styles.input}
            />

            <Title>Adicionar Itens</Title>
            <List.Section>
              {pratos.map(prato => (
                <List.Item
                  key={prato.id_prato}
                  title={prato.nome_prato}
                  description={`R$ ${prato.preco}`}
                  onPress={() => setPratoSelecionado({
                    id_prato: prato.id_prato.toString(),
                    preco_unitario: prato.preco.toString(),
                    quantidade: '1'
                  })}
                />
              ))}
            </List.Section>

            {pratoSelecionado.id_prato && (
              <View>
                <TextInput
                  label="Quantidade"
                  value={pratoSelecionado.quantidade}
                  onChangeText={text => setPratoSelecionado({...pratoSelecionado, quantidade: text})}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Button mode="contained" onPress={adicionarItem}>
                  Adicionar Item
                </Button>
              </View>
            )}

            <Title>Itens do Pedido</Title>
            {novoPedido.itens.map((item, index) => (
              <Paragraph key={index}>
                {pratos.find(p => p.id_prato.toString() === item.id_prato)?.nome_prato} 
                - Qtd: {item.quantidade}
              </Paragraph>
            ))}

            <Button mode="contained" onPress={cadastrarPedido} style={styles.button}>
              Cadastrar Pedido
            </Button>
          </ScrollView>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 5,
    maxHeight: '80%',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ListaPedidosScreen;