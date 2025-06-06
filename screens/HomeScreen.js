import React, { useState } from 'react';
import {Button, TextInput, Card, MD3LightTheme as PaperTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';

const HomeScreen = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvarUsuario = async () => {
        try{
            await axios.post('http://localhost:3000/api/usuarios', {nome, email, senha});
            alert('Usuário inserido!');
        } catch(error){
            console.log(error);
        }
        setNome('');
        setEmail('');
        setSenha('');
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Novo Usuário" 
                    subtitle="Informe os dados do novo usuário"/>
                <Card.Content>
                    <TextInput label="Nome" value={nome}
                        onChangeText={text => setNome(text)} style={styles.margem}/>
                    <TextInput label="Email" value={email}
                        onChangeText={text => setEmail(text)} style={styles.margem}/>
                    <TextInput label="Senha" value={senha}
                        onChangeText={text => setSenha(text)} 
                        secureTextEntry={true} style={styles.margem}/>
                    <Button mode="contained" onPress={salvarUsuario} style={styles.margem}>
                        Salvar
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );

}

const styles = StyleSheet.create({
    card: { margin: 10, padding: 10},
    margem: {marginTop: 5},
    container: {flex: 1, backgroundColor: PaperTheme.colors.elevation.level1}
});

export default HomeScreen;