import { getDB } from "./getDB";

export const dropTable = async (dbname: string, tableName: string) => {
    const db = await getDB(dbname);
    if (db) {
        try {
            await db.runAsync(`DROP TABLE IF EXISTS ${tableName};`);
            console.log('Table dropped successfully');
        } catch (error) {
            console.error('Error dropping table:', error);
        }
    }
};