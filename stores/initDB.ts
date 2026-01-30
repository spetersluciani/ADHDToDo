import { getDB } from "./getDB";

export const initDB = async (dbname: string) => {
    const db = await getDB(dbname);

    if (db) {
        try {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS TASKS (
                    id NUMBER PRIMARY KEY,
                    name TEXT NOT NULL,
                    duration TEXT,
                    frequency TEXT,
                    skippable BOOLEAN DEFAULT FALSE,
                    lastPerformed TEXT,
                    completed BOOLEAN DEFAULT FALSE
                )
            `);
            console.log('Database initialized successfully');
        } catch (error) {
            if (error) {
                console.error(error);
            } else {
                console.error('An error occurred initializing the database');
            }
        }
    } else {
        console.error('Error fetching database');
    }
}