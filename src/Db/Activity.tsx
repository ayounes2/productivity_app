import { SQLiteDatabase } from "react-native-sqlite-storage"

export type Activity = {
    id: number | null,
    name: string,
    estimatedTime: number | null,
    domainId: number,
}

export async function GetActivityByDomainId(db: SQLiteDatabase, id: number): Promise<Array<Activity>> {
    try {
        const activities: Activity[] = []
        const results = await db.executeSql(`SELECT * FROM Activities WHERE domainId = ${id}`)
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                activities.push(result.rows.item(index))
            }
        })
        return activities
    } catch (error) {
        console.error(error)
        throw Error(`Failed to get Activities from database for id=${id}`)
    }
}

export async function GetActivities(db: SQLiteDatabase): Promise<Array<Activity>> {
    try {
        const activities: Activity[] = []
        const results = await db.executeSql(`SELECT * FROM Activities`)
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                activities.push(result.rows.item(index))
            }
        })
        return activities
    } catch (error) {
        console.error(error)
        throw Error(`Failed to get Activities from database`)
    }
}

export async function AddActivity(db: SQLiteDatabase, activity: Activity) {
    try {
        await db.executeSql(`INSERT INTO activities (name, estimatedTime, domainId) 
        VALUES('${activity.name}', ${activity.estimatedTime}, ${activity.domainId});
        `)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to add Activity ${activity.name} to database`)
    }
}