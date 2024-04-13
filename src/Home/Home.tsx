import React, { useEffect, useState } from 'react';
import { Button, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import { AddModal } from './AddModal';
import { getDomains, Domain } from '../db/domain';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

const HomePage = ({ navigation, db }: { navigation: any, db: SQLiteDatabase }) => {
  const init = async () => {
    var domains = await getDomains(db);
    setDomains(domains);
  }

  useEffect(() => {
    init();
  }, []);

  const [domains, setDomains] = useState(Array<Domain>);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  }
  // const handleSave = (domainName: string) => {
  //   console.log("saved" + domainName);
  //   setDomains(domains.concat({ id: domains.length + 1, name: domainName, activities: [] }));
  //   setModalVisible(false);
  // }

  return (
    <ScrollView style={styles.view}>
      {domains.map(singleDomain => (
        <DomainComponent key={singleDomain.id} myDomain={singleDomain} />
      ))}
      <Modal
        animationType="fade"
        visible={modalVisible}
      >
        {/* <AddModal onCancel={handleCancel} onSave={handleSave} /> */}
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

const DomainComponent = ({ myDomain }: { myDomain: Domain }) => {
  const [showText, setShowText] = useState(true);
  return (
    <View>
      <Pressable onPress={() => setShowText(!showText)}>
        <Text style={styles.domain}>{myDomain.name}</Text>
      </Pressable>
      {/* <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        {showText === true ? myDomain.activities.map(activities => (
          <Text key={activities} style={styles.activity}>{activities}</Text>))
          : <View />}
      </View> */}
    </View>
  );
}

export default HomePage;