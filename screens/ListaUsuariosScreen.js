import React, {useEffect, useState} from "react";
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Divider, MD3LightTheme as PaperTheme} from 'react-native-paper';
import axios from 'axios';

const ListaUsuariosScreen = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const dados = async () => {
            try {
                const resposta = await axios.get('http://localhost:3000/api/usuarios');
                setUsuarios(resposta.data);
            } catch(error){
                console.log(error);
            }
        }
        dados();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={usuarios}
                renderItem={({item}) => (
                    <View>
                        <Text style={styles.text}>{item.nome}</Text>
                        <Divider/>
                    </View>
                )}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    text: {marginTop: 10, marginLeft: 20, marginBottom: 10},
    container: {flex: 1, backgroundColor: PaperTheme.colors.elevation.level1}
});

export default ListaUsuariosScreen;