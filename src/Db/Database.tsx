import { SQLiteDatabase, enablePromise, openDatabase, } from "react-native-sqlite-storage";

// Enable promise for SQLite
enablePromise(true)

export async function ConnectToDatabase() {
    return openDatabase(
        { name: "react_native_productivity.db", location: "default" },
        () => { },
        (error) => {
            console.error(error)
            throw Error("Could not connect to database")
        }
    )
}

export async function CreateTables(db: SQLiteDatabase) {
    const usersQuery = `
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    );
    `

    const domainsQuery = `
    CREATE TABLE IF NOT EXISTS Domains (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    );
    `

    const activitiesQuery = `
    CREATE TABLE IF NOT EXISTS Activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        estimatedTime INTEGER,
        domainId INTEGER,
        FOREIGN KEY (domainId) REFERENCES Domains(id) ON DELETE CASCADE
    );
    `

    const domainsSeed = `
    INSERT INTO domains (name) VALUES
        ('physical health'),
        ('mental well being'),
        ('relationships'),
        ('professional development');
    `

    const activitiesSeed = `
    INSERT INTO activities (name, estimatedTime, domainId) VALUES
        ('gym', NULL, 1), ('soccer', NULL, 1),
        ('puzzles', NULL, 2), ('movies', NULL, 2),
        ('cinema', NULL, 3), ('restaurant', NULL, 3),
        ('take online courses', NULL, 4), ('expand LinkedIn network', NULL, 4);
    `
    try {
        await db.executeSql(usersQuery)
        await db.executeSql(domainsQuery)
        await db.executeSql(activitiesQuery)
        await db.executeSql(domainsSeed)
        await db.executeSql(activitiesSeed)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}

