import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';

const DetalhesPratoScreen = () => {
    const [prato, setPrato] = useState({
        nome_prato: '',
        descricao: '',
        preco: 0,
        disponivel: true
    });
    
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const carregarPrato = async () => {
            try {
                const resposta = await api.get(`/pratos/${id}`);
                setPrato(resposta.data[0]);
            } catch(error) {
                console.error(error);
            }
        };
        carregarPrato();
    }, [id]);

    const alterarDisponibilidade = async () => {
        try {
            await api.put(`/pratos/${id}`, {
                ...prato,
                disponivel: !prato.disponivel
            });
            setPrato({...prato, disponivel: !prato.disponivel});
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                {prato.imagem && (
                    <Card.Cover source={{ uri: prato.imagem }} />
                )}
                <Card.Content>
                    <Title>{prato.nome_prato}</Title>
                    <Paragraph>{prato.descricao}</Paragraph>
                    <Paragraph>Preço: R$ {prato.preco.toFixed(2)}</Paragraph>
                    <Paragraph>Status: {prato.disponivel ? 'Disponível' : 'Indisponível'}</Paragraph>
                    <Button 
                        mode="contained" 
                        style={styles.button}
                        onPress={alterarDisponibilidade}>
                        {prato.disponivel ? 'Marcar Indisponível' : 'Marcar Disponível'}
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    card: {
        marginVertical: 8
    },
    button: {
        marginTop: 16
    }
});

export default DetalhesPratoScreen;