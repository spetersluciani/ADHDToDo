import { Task } from "@/config/interfaces";

// Convert Task data to a format suitable for database storage

export const convertForDB = (data: Task) => {
    let convertedData = {
        name: data.name,
        duration: data.duration,
        frequency: data.frequency,
        skippable: data.skippable,
        lastPerformed: '',
        completed: data.completed
    };

    if (data) {
        convertedData.lastPerformed = data.lastPerformed.toLocaleDateString();
        return convertedData;
    } else {
        console.error('No data recieved');
        return null;
    }
}