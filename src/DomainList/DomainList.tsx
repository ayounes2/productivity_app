import React, { useEffect, useState } from 'react';
import { Button, Modal, ScrollView, View, Text } from 'react-native';
import { DeleteDomain, Domain, GetDomains } from '../Db/Domain';
import { ConnectToDatabase } from '../Db/Database';
import { AddDomainModal } from './AddDomainModal';
import { styles } from './style';

function DomainListPage({ navigation }: Readonly<{ navigation: any }>) {
  const [domains, setDomains] = useState(Array<Domain>)
  const [modalVisible, setModalVisible] = useState(false)

  async function init() {
    const db = await ConnectToDatabase()
    const dbDomains = await GetDomains(db)
    setDomains(dbDomains)
    db.close()
  }

  async function onFinish() {
    setModalVisible(false)
    await init()
  }

  useEffect(() => {
    init()
  }, [])


  return (
    <ScrollView style={styles.view}>
      {domains.map(singleDomain => (
        <View key={singleDomain.id} style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button color={'green'}
              key={singleDomain.id}
              onPress={() => {
                navigation.navigate('Activities', {
                  domainId: singleDomain.id
                })
              }}
              title={singleDomain.name} />
          </View>
          <Button
            color={'maroon'}
            title='X'
            onPress={async () => {
              let db = await ConnectToDatabase()
              DeleteDomain(db, singleDomain.id)
              init()
            }}
          />
        </View>
      ))}

      <Button
        onPress={() => {
          setModalVisible(true)
        }}
        title="Add Domain"
        color="#841584"
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <AddDomainModal onFinish={onFinish} />
      </Modal>

    </ScrollView >
  )
}

export default DomainListPage;