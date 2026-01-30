import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const getDB = async (dbname: string) => {
    if (!db) {
        try {
            db = await SQLite.openDatabaseAsync(dbname);
            console.log('Database opened successfully');
        } catch (error) {
            if (error) {
                console.error(error);
            } else {
                console.error('An error occurred fetching the database');
            }
        }
    }
    return db;
};