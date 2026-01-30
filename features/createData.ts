import { Task } from "@/config/interfaces";
import { convertForDB } from "@/helpers/convertDataForDB";
import { getDB } from "@/stores/getDB";

// Create a new entry in the table
export const createData = async (dbname: string, data: Task) => {
    const db = await getDB(dbname);
    let convertDataForDB = convertForDB(data);

    console.log('Converted Data:', convertDataForDB);

    if (db && convertDataForDB) {
        const statement = await db.prepareAsync(`INSERT INTO TASKS (name, duration, frequency, skippable, lastPerformed, completed) VALUES ($name, $duration, $frequency, $skippable, $lastPerformed, $completed)`);
        try {
            let result = await statement.executeAsync({
                $name: convertDataForDB.name,
                $duration: convertDataForDB.duration,
                $frequency: convertDataForDB.frequency,
                $skippable: convertDataForDB.skippable,
                $lastPerformed: convertDataForDB.lastPerformed,
                $completed: convertDataForDB.completed
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            await statement.finalizeAsync();
        };
    } else {
        console.error('Error fetching database - createData');
        return false;
    }
};