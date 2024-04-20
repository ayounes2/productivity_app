import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Activity, getActivityByDomainId } from '../db/activity';
import { connectToDatabase } from '../db/db';

function ActivityListPage({ route, navigation }: Readonly<{ route: any, navigation: any }>) {
    const { domainId } = route.params;
    const [activities, setActivities] = useState(Array<Activity>)

    const init = async () => {
        const db = await connectToDatabase()
        const dbActivities = await getActivityByDomainId(db, domainId)
        setActivities(dbActivities)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <ScrollView>
            {activities.map(activity => (
                <Text key={activity.id}>{activity.name}</Text>
            ))}
        </ScrollView>
    )
}

export default ActivityListPage;