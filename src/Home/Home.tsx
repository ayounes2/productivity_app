import React, { useEffect, useState } from 'react';
import { Button, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import { AddModal } from './AddModal';
import { Domain, getDomains } from '../db/domain';
import { Activity, getActivityByDomainId } from '../db/activity';
import { connectToDatabase } from '../db/db';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

const HomePage = ({ navigation }: { navigation: any }) => {
  const init = async () => {
    const db = await connectToDatabase()
    const dbDomains = await getDomains(db)
    setDomains(dbDomains)
    setMyDb(db)
  }

  useEffect(() => {
    init()
  }, [])

  const [myDb, setMyDb] = useState<SQLiteDatabase | null>(null)
  const [domains, setDomains] = useState(Array<Domain>)
  const [modalVisible, setModalVisible] = useState(false)

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
      {myDb && domains.map(singleDomain => (
        <DomainComponent key={singleDomain.id} myDomain={singleDomain} db={myDb} />
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

const DomainComponent = ({ myDomain, db }: { myDomain: Domain, db: SQLiteDatabase }) => {
  const [activities, setActivities] = useState(Array<Activity>)
  const [showText, setShowText] = useState(true)

  const init = async () => {
    const dbActivities = await getActivityByDomainId(db, myDomain.id);
    setActivities(dbActivities);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <View>
      <Pressable onPress={() => setShowText(!showText)}>
        <Text style={styles.domain}>{myDomain.name}</Text>
      </Pressable>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        {showText === true ? activities.map(activity => (
          <Text key={activity.id} style={styles.activity}>{activity.name}</Text>))
          : <View />}
      </View>
    </View>
  );
}

export default HomePage;