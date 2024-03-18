import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

type DomainProps = {
  id: number,
  name: string,
  activities: Array<string>
}


let myDomains: Array<DomainProps> = [{
  id: 1,
  name: 'Indoor',
  activities: ['Apex', 'Doto', 'tiktok', 'Apex2', 'Doto2', 'tiktok2', 'Apex3', 'Doto3', 'tiktok3'],
}, {
  id: 2,
  name: 'Outdoor',
  activities: ['Cycling', 'Walk in the Park'],
}, {
  id: 3,
  name: 'test',
  activities: ['Cycling', 'Walk in the Park'],
}];

const HomePage = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    setDomains(myDomains);
  }, []);

  const [domains, setDomains] = useState(Array<DomainProps>);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.view}>
      {domains.map(singleDomain => (
        <Domain key={singleDomain.id} myDomain={singleDomain} />
      ))}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Text>yeeeet</Text>
      </Modal>
      <Button
        onPress={() => {
          setModalVisible(!modalVisible);
          //setDomains(domains.concat({ id: domains.length + 1, name: 'yeet', activities: [] }));
        }}
        title="Add Domain"
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