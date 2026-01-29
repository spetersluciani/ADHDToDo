import { Task } from "@/config/interfaces";
import { convertForDB } from "@/helpers/convertDataForDB";
import { getDB } from "@/stores/getDB";

// Update an existing entry in the table
export const updateData = async (dbname: string, data: Task, id: number) => {
    const db = await getDB();
    let convertDataForDB = convertForDB(data);

    if (db && convertDataForDB) {
        try {
            await db.runAsync(`UPDATE ${dbname} SET name = ?, duration = ?, frequency = ?, skippable = ?, lastPerformed = ?, completed = ? WHERE id = ?`,
            [
                convertDataForDB.name,
                convertDataForDB.duration,
                convertDataForDB.frequency,
                convertDataForDB.skippable,
                convertDataForDB.lastPerformed,
                convertDataForDB.completed,
                id
            ]);
            return true;
        } catch (error) {
            console.error('Error updating data:', error);
            return false;
        }
    } else {
        console.error('Error fetching database');
    }
};