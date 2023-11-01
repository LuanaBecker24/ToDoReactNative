import { useState } from "react";
import { Button, Text, View, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import metadata from '../storage.metadata.json';

const AddListScreen = () => {
    const [newItem, setNewItem] = useState("");

    const addItemToList = async () => {
        if (newItem.trim() !== "") {
            // Adicione o novo item à lista
            const savedItemList = await AsyncStorage.getItem(metadata.LIST.ITEMS);
            let itemList = [];
            if (savedItemList) {
                itemList = JSON.parse(savedItemList);
            }
            itemList.push(newItem);
            await AsyncStorage.setItem(metadata.LIST.ITEMS, JSON.stringify(itemList));

            // Redirecione de volta para a tela HomeScreen
            navigation.navigate("HomeScreen");
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Add an item to the list</Text>
            <TextInput
                placeholder="New Item"
                value={newItem}
                onChangeText={setNewItem}
            />
            <Button title="Add Item" onPress={addItemToList} />
        </View>
    );
}

export default AddListScreen;
