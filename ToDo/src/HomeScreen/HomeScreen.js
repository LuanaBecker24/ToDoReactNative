import { useEffect, useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
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
        const listName = await AsyncStorage.getItem(metadata.LIST.ITEM);
        if (listName) {
            setItem(listName);
        }
    }

    const loadItems = async () => {
        const savedItemList = await AsyncStorage.getItem(metadata.LIST.ITEMS);
        if (savedItemList) {
            setItemList(JSON.parse(savedItemList));
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>Creating your task lists</Text>
            <Button
                title="Add an Item"
                onPress={() => navigation.navigate("AddListScreen")}
            />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Items:</Text>
            <ScrollView>
                {itemList.map((item, index) => (
                    <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                        <Text>{`${index + 1}. ${item}`}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default HomeScreen;
