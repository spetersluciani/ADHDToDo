import { getDB } from "@/stores/getDB";

export const deleteData = async (dbname: string, id: number) => {
    const db = await getDB();

    if (db) {
        try {
            await db.runAsync(`DELETE FROM ${dbname} WHERE id = ?`, [id]);
            return true;
        } catch (error) {
            console.error('Error deleting data:', error);
            return false;
        };
    } else {
        console.error('Error fetching database');
    }
};