import { useState } from "react";
import { Button, Text, View, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import metadata from '../storage.metadata.json';
import { useRoute } from '@react-navigation/native';

const EditListName = ({ navigation }) => {

    return (
        <View style={{  flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff8f0"  }} >
            <Text style={{ marginBottom: 15, fontSize: 20 }} >Altere o nome da sua lista</Text>
            <TextInput
                style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}
                placeholder="Digite o novo nome"
            />
            <Button color="#4c956c" title="Alterar"  />
        </View>
    );
};

export default EditListName;
