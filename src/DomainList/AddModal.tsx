import React, { useState } from "react";
import { Alert, Button, Modal, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker";


interface ModalProps {
    onCancel: () => void; // Function for handling cancel action
    onSave: (domainName: string) => void; // Function for handling add action
    // myDomains: Array<DomainProps>,
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

export const AddModal: React.FC<ModalProps> = ({ onCancel, onSave }) => {
    const [name, setName] = useState('');
    const [domainToggle, setDomainToggle] = useState(false);

    const InputType = () => {
        const onDomainToggle = () => {
            setDomainToggle(!domainToggle);
        }

        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Text style={styles.formHeader}>Domain</Text>
                <Switch
                    onValueChange={onDomainToggle}
                    value={domainToggle} />
                <Text style={styles.formHeader}>Activity</Text>
            </View>
        );
    }

    const DomainSelector = () => {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' }
        ]);
        return (
            <View>
                <Text style={styles.formHeader}>Domain</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
        )
    }

    const handleSave = () => {
        onSave(name);
    }

    return (
        <View style={styles.view}>
            <InputType></InputType>
            <Text style={styles.formHeader}>{domainToggle === true ? "Activity" : "Domain"} Name</Text>
            <TextInput onChangeText={setName} value={name} style={styles.input} />
            {domainToggle === true ? <DomainSelector /> : <View />}
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                <Button color={'red'} onPress={onCancel} title="Cancel" />
                <Button color={'black'} onPress={handleSave} title="Add" disabled={name.length == 0} />
            </View>

        </View>
    );
}