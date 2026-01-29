import * as SQLite from "expo-sqlite";

const DB_NAME: string = "todoApp";

let db: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
    if (!db) {
        try {
            db = await SQLite.openDatabaseAsync(DB_NAME);
            return db;
        } catch (error) {
            if (error) {
                console.error(error);
            } else {
                console.error('An error occurred fetching the database');
            }
        }
    }
};