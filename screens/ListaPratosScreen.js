import React, {useEffect, useState} from "react";
import {View, FlatList, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button, MD3LightTheme as PaperTheme, FAB, Portal, Modal, TextInput} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import api from '../services/api';
import axios from 'axios';

const ListaPratosScreen = () => {
    const navigation = useNavigation();
    const [pratos, setPratos] = useState([]);
    const [visible, setVisible] = useState(false);
    const [novoPrato, setNovoPrato] = useState({
        nome_prato: '',
        descricao: '',
        preco: '',
        disponivel: true
    });

    useEffect(() => {
        carregarPratos();
    }, []);

    const carregarPratos = async () => {
        try {
            const resposta = await api.get('/pratos');
            setPratos(resposta.data);
        } catch(error){
            console.error('Erro ao carregar pratos:', error);
        }
    };

    const cadastrarPrato = async () => {
        try {
            await api.post('/pratos', novoPrato);
            setVisible(false);
            carregarPratos();
            alert('Prato cadastrado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar prato');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList 
                data={pratos}
                keyExtractor={(item) => item.id_prato.toString()}
                renderItem={({item}) => (
                    <Card style={styles.card}>
                        {item.imagem && (
                            <Card.Cover source={{ uri: item.imagem }} />
                        )}
                        <Card.Content>
                            <Title>{item.nome_prato}</Title>
                            <Paragraph>R$ {parseFloat(item.preco).toFixed(2)}</Paragraph>
                            <Paragraph>{item.descricao}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                        </Card.Actions>
                    </Card>
                )}
            />

            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)}>
                    <View style={styles.modal}>
                        <TextInput
                            label="Nome do Prato"
                            value={novoPrato.nome_prato}
                            onChangeText={text => setNovoPrato({...novoPrato, nome_prato: text})}
                        />
                        <TextInput
                            label="Descrição"
                            value={novoPrato.descricao}
                            onChangeText={text => setNovoPrato({...novoPrato, descricao: text})}
                        />
                        <TextInput
                            label="Preço"
                            value={novoPrato.preco}
                            onChangeText={text => setNovoPrato({...novoPrato, preco: text})}
                            keyboardType="numeric"
                        />
                        <Button mode="contained" onPress={cadastrarPrato}>
                            Cadastrar
                        </Button>
                    </View>
                </Modal>
            </Portal>
            
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setVisible(true)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: { 
        margin: 10,
        elevation: 4
    },
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: PaperTheme.colors.background
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});

export default ListaPratosScreen;