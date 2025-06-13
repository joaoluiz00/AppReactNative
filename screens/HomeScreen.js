import React from 'react';
import {Button, TextInput, Card, Title, Paragraph, MD3LightTheme as PaperTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Bem-vindo ao Sistema de Restaurante</Title>
          <Paragraph style={styles.paragraph}>
            Utilize o menu lateral para navegar entre as funcionalidades do sistema
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: PaperTheme.colors.background
  },
  card: {
    marginVertical: 8,
    elevation: 4
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: PaperTheme.colors.secondary
  }
});

export default HomeScreen;