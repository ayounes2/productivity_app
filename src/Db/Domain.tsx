import { SQLiteDatabase } from "react-native-sqlite-storage"

export type Domain = {
    id: number | null,
    name: string
}

export async function GetDomains(db: SQLiteDatabase): Promise<Array<Domain>> {
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

export async function DeleteDomain(db: SQLiteDatabase, id: number | null) {
    try {
        await db.executeSql(`DELETE FROM Domains WHERE id = ${id}`)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to delete Domain with id=${id}`)
    }
}

export async function AddDomain(db: SQLiteDatabase, domain: Domain) {
    try {
        await db.executeSql(`INSERT INTO domains (name) VALUES ('${domain.name}');`)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to add Domain ${domain.name} to database`)
    }
}