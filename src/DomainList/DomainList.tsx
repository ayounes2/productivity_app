import React, { useEffect, useState } from 'react';
import { Button, Modal, ScrollView, Text } from 'react-native';
import { styles } from './style';
import { Domain, getDomains } from '../db/domain';
import { connectToDatabase } from '../db/db';

const DomainListPage = ({ navigation }: { navigation: any }) => {
  const init = async () => {
    const db = await connectToDatabase()
    const dbDomains = await getDomains(db)
    setDomains(dbDomains)
  }

  useEffect(() => {
    init()
  }, [])

  const [domains, setDomains] = useState(Array<Domain>)

  return (
    <ScrollView style={styles.view}>
      {domains.map(singleDomain => (
        <Button color={'green'}
          onPress={() => {
            navigation.navigate('ActivityList', {
              domainId: singleDomain.id
            })
            console.log(singleDomain.id)
          }}
          key={singleDomain.id}
          title={singleDomain.name} />
      ))}

      <Button
        onPress={() => {
          console.log('add domain')
        }}
        title="Add Domain"
        color="#841584"
      />
    </ScrollView >
  )
}

export default DomainListPage;