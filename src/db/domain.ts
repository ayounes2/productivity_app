import { SQLiteDatabase } from "react-native-sqlite-storage"

export type Domain = {
    id: number,
    name: string
}

export const getDomains = async (db: SQLiteDatabase): Promise<Array<Domain>> => {
    try {
        const domains: Domain[] = []
        const results = await db.executeSql("SELECT * FROM Domains")
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                domains.push(result.rows.item(index))
            }
        })
        return domains
    } catch (error) {
        console.error(error)
        throw Error("Failed to get Domains from database")
    }
}