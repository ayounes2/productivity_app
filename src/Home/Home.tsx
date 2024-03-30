import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { AddModal } from './AddModal';
import { DomainProps, myDomains } from './data';

const HomePage = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    setDomains(myDomains);
  }, [myDomains]);

  const [domains, setDomains] = useState(Array<DomainProps>);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  }
  const handleSave = (domainName: string) => {
    console.log("saved" + domainName);
    setDomains(domains.concat({ id: domains.length + 1, name: domainName, activities: [] }));
    setModalVisible(false);
  }

  return (
    <ScrollView style={styles.view}>
      {domains.map(singleDomain => (
        <Domain key={singleDomain.id} myDomain={singleDomain} />
      ))}
      <Modal
        animationType="fade"
        visible={modalVisible}
      >
        <AddModal onCancel={handleCancel} onSave={handleSave} />
      </Modal>
      <Button
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        title="Add Item"
        color="#841584"
      />
    </ScrollView >
  );
};

const Domain = ({ myDomain }: { myDomain: DomainProps }) => {
  const [showText, setShowText] = useState(true);
  return (
    <View>
      <Pressable onPress={() => setShowText(!showText)}>
        <Text style={styles.domain}>{myDomain.name}</Text>
      </Pressable>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        {showText === true ? myDomain.activities.map(activities => (
          <Text key={activities} style={styles.activity}>{activities}</Text>))
          : <View />}
      </View>
    </View>
  );
}

export default HomePage;