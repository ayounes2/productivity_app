import React, { useEffect, useState } from 'react';
import { Button, Modal, ScrollView, Text, View } from 'react-native';
import { Activity, DeleteActivity, GetActivityByDomainId } from '../Db/Activity';
import { ConnectToDatabase } from '../Db/Database';
import { styles } from './style';
import { AddActivityModal } from './AddActivityModal';

function ActivityListPage({ route, navigation }: Readonly<{ route: any, navigation: any }>) {
    const { domainId } = route.params;
    const [activities, setActivities] = useState(Array<Activity>)
    const [modalVisible, setModalVisible] = useState(false)

    async function init() {
        const db = await ConnectToDatabase()
        const dbActivities = await GetActivityByDomainId(db, domainId)
        setActivities(dbActivities)
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
            {activities.map(activity => (
                <View key={activity.id} style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Button color={'green'}
                            key={activity.id}
                            title={activity.name} />
                    </View>
                    <Button
                        color={'maroon'}
                        title='X'
                        onPress={async () => {
                            let db = await ConnectToDatabase()
                            DeleteActivity(db, activity.id)
                            init()
                        }}
                    />
                </View>
            ))}

            <Button
                onPress={() => {
                    setModalVisible(true)
                }}
                title="Add Activity"
                color="#841584"
            />
            <Modal
                animationType="slide"
                visible={modalVisible}
            >
                <AddActivityModal onFinish={onFinish} domainId={domainId} />
            </Modal>
        </ScrollView>
    )
}

export default ActivityListPage;