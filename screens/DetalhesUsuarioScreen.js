import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import { Card, TextInput, Button, MD3LightTheme as PaperTheme } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DetalhesUsuarioScreen = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [visivel, setVisivel] = useState(false);
    const route = useRoute();
    const { id } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        const retornausuario = async () => {
            try {
                const resposta = await axios.get('http://localhost:3000/api/usuarios/' + id);
                setNome(resposta.data[0].nome);
                setEmail(resposta.data[0].email);
                setSenha(resposta.data[0].senha);
            } catch(error) {
                console.log(error);
            }
        };
        retornausuario();
    }, [id]);

    const excluirUsuario = async () => {
        try {
            await axios.delete('http://localhost:3000/api/usuarios/' + id);
            alert('Usuário excluído com sucesso!');
            setVisivel(false);
            navigation.goback();
        } catch(error) {
            console.log(error);
        }
        setVisivel(false);
    }

    const alterarUsuario = async () => {
        try {
            await axios.put('http://localhost:3000/api/usuarios/' + id, {nome, email, senha});
            alert('Usuário alterado com sucesso!');
            navigation.goBack();
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Detalhes do Usuário" 
                    subtitle=""/>
                <Card.Content>
                    <TextInput label="Nome" value={nome}
                        onChangeText={text => setNome(text)} style={styles.margem}/>
                    <TextInput label="Email" value={email}
                        onChangeText={text => setEmail(text)} style={styles.margem}/>
                    <TextInput label="Senha" value={senha}
                        onChangeText={text => setSenha(text)} 
                        secureTextEntry={true} style={styles.margem}/>
                    <Button mode="contained" style={styles.margem}
                            onPress={alterarUsuario}>
                        Alterar
                    </Button>
                    <Button mode="contained" style={styles.margem}
                            onPress={() => setVisivel(true)}>
                        Excluir
                    </Button>
                </Card.Content>
            </Card>
            <Modal visible={visivel}> 
                <Text>Deseja realmente excluir esse registro?</Text>
                <Button mode="contained"
                        onPress={excluirUsuario}
                >Sim</Button>

                <Button mode="contained" onPress={() => {setVisivel(false)}}>Não</Button>
            </Modal>
        </View>
    );



}

const styles = StyleSheet.create({
    card: { margin: 10, padding: 10},
    margem: {marginTop: 5},
    container: {flex: 1, backgroundColor: PaperTheme.colors.elevation.level1}
});


export default DetalhesUsuarioScreen;