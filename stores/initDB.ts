import { getDB } from "./getDB";

export const initDB = async () => {
    const db = await getDB();

    if (db) {
        try {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS TASKS (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    duration TEXT,
                    frequency TEXT,
                    skippable BOOLEAN DEFAULT FALSE,
                    lastPerformed TEXT,
                    completed BOOLEAN DEFAULT FALSE
                )
            `);

            return true;
        } catch (error) {
            if (error) {
                console.error(error);
            } else {
                console.error('An error occurred initializing the database');
            }
            
            return false;
        }
    } else {
        console.error('Error fetching database');
        return false;
    }
}