export interface StoredTask {
    id: string;
    name: string;
    duration: string;
    frequency: string;
    skippable: boolean;
    lastPerformed: string;
    completed: boolean;
}

export interface Task {
    name: string;
    duration: string;
    frequency: string;
    skippable: boolean;
    lastPerformed: Date;
    completed: boolean;
}