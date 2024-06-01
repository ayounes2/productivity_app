import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { Activity, AddActivity } from '../Db/Activity';
import { ConnectToDatabase } from "../Db/Database";
import { Picker } from '@react-native-picker/picker';


interface ModalProps {
    onFinish: () => void,
    domainId: number
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

export function AddActivityModal({ onFinish, domainId }: Readonly<ModalProps>) {
    const [name, setName] = useState('');
    const [selectedHour, setSelectedHour] = useState(Number);
    const [selectedMinute, setSelectedMinute] = useState(Number);

    function MinutePicker() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <View style={{ borderWidth: 1, borderRadius: 10, backgroundColor: 'gray' }}>
                    <Picker
                        style={{ width: 100 }}
                        selectedValue={selectedMinute}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedMinute(itemValue)
                        }>
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="15" value="0.25" />
                        <Picker.Item label="30" value="0.5" />
                        <Picker.Item label="45" value="0.75" />
                    </Picker>
                </View>
                <Text style={styles.formHeader}>Minute(s)</Text>
            </View>
        )
    }

    function HourPicker() {
        const hours = Array.from({ length: 24 }, (_, index) => index)
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <View style={{ borderWidth: 1, borderRadius: 10, backgroundColor: 'gray' }}>
                    <Picker
                        style={{ width: 100 }}
                        selectedValue={selectedHour}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedHour(itemValue)
                        }>
                        {hours.map((hour) => (
                            <Picker.Item
                                key={hour}
                                label={hour.toString()}
                                value={hour.toString()}
                            />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.formHeader}> Hour(s)  </Text>
            </View>
        )
    }

    async function handleSave() {
        const myActivity: Activity = {
            id: null,
            name: name,
            estimatedTime: Number(Number(selectedHour) + Number(selectedMinute)),
            domainId: domainId
        }
        const db = await ConnectToDatabase()
        await AddActivity(db, myActivity)
        onFinish()
    }

    return (
        <View style={styles.view}>
            <Text style={styles.formHeader}>Activity Name</Text>
            <TextInput onChangeText={setName} value={name} style={styles.input} />
            <Text />
            <Text style={styles.formHeader}>Estimated Time</Text>
            <Text />
            <HourPicker />
            <Text />
            <MinutePicker />
            <Text />
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                <Button color={'maroon'} onPress={onFinish} title="Cancel" />
                <Button color={'black'} onPress={handleSave} title="Add" disabled={name.length == 0 || (selectedHour == 0 && selectedMinute == 0)} />
            </View>
        </View>
    );
}