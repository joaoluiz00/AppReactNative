import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, DataTable } from 'react-native-paper';
import api from '../services/api';

const DetalhesPedidoScreen = ({ route }) => {
  const { id } = route.params;
  const [pedido, setPedido] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);

  useEffect(() => {
    carregarDetalhesPedido();
  }, []);

  const carregarDetalhesPedido = async () => {
    try {
      const [pedidoRes, itensRes] = await Promise.all([
        api.get(`/pedidos/${id}`),
        api.get(`/itens-pedido/${id}`)
      ]);
      setPedido(pedidoRes.data);
      setItensPedido(itensRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!pedido) return null;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Pedido #{pedido.id_pedido}</Title>
          <Paragraph>Cliente: {pedido.nome_cliente}</Paragraph>
          <Paragraph>Mesa: {pedido.id_mesa}</Paragraph>
          <Paragraph>Status: {pedido.status_pedido}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Itens do Pedido</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item</DataTable.Title>
              <DataTable.Title numeric>Qtd</DataTable.Title>
              <DataTable.Title numeric>Preço</DataTable.Title>
              <DataTable.Title numeric>Total</DataTable.Title>
            </DataTable.Header>

            {itensPedido.map((item) => (
              <DataTable.Row key={item.id_item_pedido}>
                <DataTable.Cell>{item.nome_prato}</DataTable.Cell>
                <DataTable.Cell numeric>{item.quantidade}</DataTable.Cell>
                <DataTable.Cell numeric>R$ {item.preco_unitario}</DataTable.Cell>
                <DataTable.Cell numeric>
                  R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
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
});

export default DetalhesPedidoScreen;