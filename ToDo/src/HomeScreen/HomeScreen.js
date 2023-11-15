import { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import metadata from "../storage.metadata.json";

const HomeScreen = ({ navigation }) => {
    const [item, setItem] = useState("");
    const [itemList, setItemList] = useState([]);
    const focus = useIsFocused();

    useEffect(() => {
        getItemName();
        loadItems();
    }, [focus]);

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

    const removeListName = async (indexToRemove) => {
        const updatedItemList = itemList.filter((_, index) => index !== indexToRemove);
        await AsyncStorage.setItem(metadata.LIST.TASK, JSON.stringify(updatedItemList));
        setItemList(updatedItemList);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff8f0" }}>
            <Text style={{ textAlign: 'center', marginTop: 21, fontSize: 20, marginBottom: 5 }}>O que você precisa fazer hoje?</Text>
            <View style={styles.buttonContainer} >
                <Button
                    style={styles.buttonContainer}
                    color="#4c956c"
                    title="Adicione novas tarefas"
                    onPress={() => navigation.navigate("AddListScreen")}
                />
            </View>
            <ScrollView>
                {itemList.map((item, index) => (
                    <View key={index} style={{ padding: 10, borderBottomWidth: 1 }}>
                        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17 }}>{`${index + 1}. ${item}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <TouchableOpacity onPress={() => removeListName(index)}>
                                    <Text style={{ fontSize: 17 }}>🗑</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate("EditListName", item) }}>
                                    <Text style={{ fontSize: 17 }}>✏️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 12,
        gap: 10,
    }
});

export default HomeScreen;
