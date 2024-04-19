import React, { useEffect, useState } from 'react';
import { Button, Modal, ScrollView, Text } from 'react-native';
import { Activity } from '../db/activity';

function ActivityListPage({ route, navigation }: Readonly<{ route: any, navigation: any }>) {
    const { domainId } = route.params;
    const [activities, setActivities] = useState(Array<Activity>)

    return (
        <ScrollView>
            <Text>domain ID is {domainId}</Text>
        </ScrollView>
    )
}

export default ActivityListPage;