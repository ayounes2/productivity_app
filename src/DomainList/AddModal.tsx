import React, { useState } from "react";
import { Alert, Button, Modal, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import { Domain, addDomain } from '../db/domain';
import DropDownPicker from "react-native-dropdown-picker";
import { connectToDatabase } from "../db/db";


interface ModalProps {
    onFinish: () => void
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#0000BF6F',
        padding: 10,
    },
    formHeader: {
        color: 'black',
        fontSize: 30,
        alignContent: 'center',
    },
    input: {
        borderRadius: 10,
        backgroundColor: 'white',

    },
    button: {
        flex: 1,
    },
});

export const AddModal: React.FC<ModalProps> = ({ onFinish }) => {
    const [name, setName] = useState('');

    const handleSave = async () => {
        const myDomain: Domain = {
            id: null,
            name: name
        };
        const db = await connectToDatabase()
        await addDomain(db, myDomain)
        onFinish()
    }

    return (
        <View style={styles.view}>
            <Text style={styles.formHeader}>Domain Name</Text>
            <TextInput onChangeText={setName} value={name} style={styles.input} />
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                <Button color={'maroon'} onPress={onFinish} title="Cancel" />
                <Button color={'black'} onPress={handleSave} title="Add" disabled={name.length == 0} />
            </View>

        </View>
    );
}