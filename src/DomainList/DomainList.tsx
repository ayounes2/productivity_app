import React, { useEffect, useState } from 'react';
import { Button, Modal, ScrollView } from 'react-native';
import { Domain, getDomains } from '../db/domain';
import { connectToDatabase } from '../db/db';
import { AddModal } from './AddModal';
import { styles } from './style';

function DomainListPage({ navigation }: Readonly<{ navigation: any }>) {
  const [modalVisible, setModalVisible] = useState(false)

  async function init() {
    const db = await connectToDatabase()
    const dbDomains = await getDomains(db)
    setDomains(dbDomains)
    db.close()
  }

  useEffect(() => {
    init()
  }, [])

  const [domains, setDomains] = useState(Array<Domain>)

  async function onFinish() {
    setModalVisible(false)
    await init()
  }

  return (
    <ScrollView style={styles.view}>
      {domains.map(singleDomain => (
        <Button color={'green'}
          onPress={() => {
            navigation.navigate('Activities', {
              domainId: singleDomain.id
            })
          }}
          key={singleDomain.id}
          title={singleDomain.name} />
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
        <AddModal onFinish={onFinish} />
      </Modal>

    </ScrollView >
  )
}

export default DomainListPage;