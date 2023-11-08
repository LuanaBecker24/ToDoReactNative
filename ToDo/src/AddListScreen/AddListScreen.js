import { useState } from "react";
import { Button, Text, View, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import metadata from '../storage.metadata.json';

const AddListScreen = ({ navigation }) => {
    const [newItem, setNewItem] = useState("");

    const addItemToList = async () => {
        if (newItem.trim() !== "") {
            const savedItemList = await AsyncStorage.getItem(metadata.LIST.TASK);
            let itemList = [];
            if (savedItemList) {
                itemList = JSON.parse(savedItemList);
            }
            itemList.push(newItem);
            await AsyncStorage.setItem(metadata.LIST.TASK, JSON.stringify(itemList));

            navigation.navigate("HomeScreen");
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff8f0" }}>
            <Text style={{ marginBottom: 15, fontSize: 20 }}>Adicione um item para sua lista:</Text>
            <TextInput
                style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}
                placeholder="New Item"
                value={newItem}
                onChangeText={setNewItem}
            />
            <Button color="#4c956c" title="Adicionar" onPress={addItemToList} />
        </View>
    );
}

export default AddListScreen;
