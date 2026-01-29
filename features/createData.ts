import { Task } from "@/config/interfaces";
import { convertForDB } from "@/helpers/convertDataForDB";
import { getDB } from "@/stores/getDB";

// Create a new entry in the table
export const createData = async (dbname: string, data: Task) => {
    const db = await getDB();
    let convertDataForDB = convertForDB(data);

    if (db && convertDataForDB) {
        try {
            await db.runAsync(`INSERT INTO ${dbname} (name, duration, frequency, skippable, lastPerformed, completed) VALUES (?,?,?,?,?,?)`),
            [
                convertDataForDB.name,
                convertDataForDB.duration,
                convertDataForDB.frequency,
                convertDataForDB.skippable,
                convertDataForDB.lastPerformed,
                convertDataForDB.completed
            ];

            return true;

        } catch (error) {
            console.error('Error creating data:', error);
            return false;
        };
    } else {
        console.error('Error fetching database');
    }
};