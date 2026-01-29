import { getDB } from "@/stores/getDB";

// Read a single entry by ID
export const readSingleData = async <T>(dbname: string, id: number) => {
    const db = await getDB();

    if (db) {
        try {
            const result = await  db.getFirstAsync<T>(`SELECT * FROM ${dbname} WHERE id = ?`, [id]);
            return result;
        } catch (error) {
            console.error('Error reading data:', error);
            return null;
        }
    } else {
        console.error('Error fetching database');
    }
}

// Read all entries from the table
export const readAllData = async <T>(dbname: string) => {
    const db = await getDB();

    if (db) {
        try {
            const results = await db.getAllAsync<T>(`SELECT * FROM ${dbname}`);
            return results;
        } catch (error) {
            console.error('Error reading data:', error);
            return null;
        }
    } else {
        console.error('Error fetching database');
    }
}