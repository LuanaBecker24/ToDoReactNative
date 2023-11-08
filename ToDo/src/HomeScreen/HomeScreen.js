import { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import metadata from "../storage.metadata.json";

const HomeScreen = ({ navigation }) => {
    const [item, setItem] = useState("");
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        getItemName();
        loadItems();
    }, []);

    const getItemName = async () => {
        const listName = await AsyncStorage.getItem(metadata.LIST.TASK);
        if (listName) {
            setItem(listName);
        }
    }

    const loadItems = async () => {
        const savedItemList = await AsyncStorage.getItem(metadata.LIST.TASK);
        if (savedItemList) {
            setItemList(JSON.parse(savedItemList));
        }
    }

    const removeItem = async (indexToRemove) => {
        const updatedItemList = itemList.filter((_, index) => index !== indexToRemove);
        await AsyncStorage.setItem(metadata.LIST.TASK, JSON.stringify(updatedItemList));
        setItemList(updatedItemList);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff8f0" }}>
            <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20, marginBottom: 10 }}>O que você precisa fazer hoje?</Text>
            <Button
                color="#4c956c"
                title="Adicione novas tarefas"
                onPress={() => navigation.navigate("AddListScreen")}
            />
            <ScrollView>
                {itemList.map((item, index) => (
                    <View key={index} style={{ padding: 10, borderBottomWidth: 1, gap: 20 }}>
                        <Text style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {`${index + 1}. ${item}`}
                            <TouchableOpacity onPress={() => removeItem(index)}>
                                <Text style={{ fontSize: 15 }}>🗑</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default HomeScreen;
