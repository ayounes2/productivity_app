import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { Domain, addDomain } from '../db/domain';
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

export function AddModal({ onFinish }: Readonly<ModalProps>) {
    const [name, setName] = useState('');

    async function handleSave() {
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