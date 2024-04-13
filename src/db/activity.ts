import { SQLiteDatabase } from "react-native-sqlite-storage"

export type Activity = {
    id: number,
    name: string,
    estimatedTime: number,
    domainId: number,
}

export const getActivityByDomainId = async (db: SQLiteDatabase, id: number): Promise<Array<Activity>> => {
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

export const getActivities = async (db: SQLiteDatabase): Promise<Array<Activity>> => {
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