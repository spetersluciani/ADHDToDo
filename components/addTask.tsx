import { Task } from "@/config/interfaces";
import { createData } from "@/features/createData";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, Switch, Text, TextInput, View } from "react-native";
import { DatePickerInput } from 'react-native-paper-dates';

interface TaskProps {
    dbname: string;
    initialData?: Task;
}

const handleAddTask = async (dbname: string, task: Task) => {
    const taskData: Task = {
        name: task.name,
        duration: task.duration,
        frequency: task.frequency,
        skippable: task.skippable,
        lastPerformed: task.lastPerformed,
        completed: false
    }

    if (taskData.name.trim() === '') { 
        alert("Task name cannot be empty");
    } else {
        console.log(taskData);
        const response = await createData(dbname, taskData);

        if (response) {
            alert("Task added successfully");
        } else {
            alert("Failed to add task");
        }
    }
}

const AddTaskForm: React.FC<TaskProps> = ({ dbname, initialData }) => {
    const [formData, setFormData] = useState<Task>(initialData || {
        name: '',
        duration: '',
        frequency: '',
        skippable: false,
        lastPerformed: new Date(),
        completed: false
    });

    const handleNameChange = (e: any) => {
        setFormData({ ...formData, name: e.target.value });
    };

    const handleDurationChange = (e: any) => {
        setFormData({ ...formData, duration: e });
    };  

    const handleFrequencyChange = (e: any) => {
        setFormData({ ...formData, frequency: e });
    };

    const handleSkippableChange = (e: any) => {
        setFormData({ ...formData, skippable: e });
    };

    const handleLastPerformedChange = (e: any) => {
        setFormData({ ...formData, lastPerformed: new Date(e.target.value) });
    };

    // Idea: I want the placeholder text to rotate examples of task names
    return (
        <View>
            <Text>Add New Task</Text>
            <View>
                <Text>What is the task?</Text>
                <TextInput value={formData.name} placeholder="Do the laundry" onChange={handleNameChange} />
                <Text>How long does the task take?</Text>
                <Picker 
                    selectedValue={formData.duration}
                    onValueChange={currentDuration => handleDurationChange(currentDuration)}>
                    <Picker.Item label="15 minutes" value="15" />
                    <Picker.Item label="30 minutes" value="30" />
                    <Picker.Item label="45 minutes" value="45" />
                    <Picker.Item label="1 hour" value="60" />
                    <Picker.Item label="2 hour" value="120" />
                    <Picker.Item label="I'm not sure" value="unknown" />
                </Picker>
                <Text>How often should this task be done?</Text>
                <Picker 
                    selectedValue={formData.frequency}
                    onValueChange={currentFrequency => handleFrequencyChange(currentFrequency)}>
                    <Picker.Item label="Daily" value="daily" />
                    <Picker.Item label="Every other day" value="alternating" />
                    <Picker.Item label="Twice a week" value="twiceWeekly" />
                    <Picker.Item label="Weekly" value="weekly" />
                    <Picker.Item label="Every other week" value="biweekly" />
                    <Picker.Item label="Monthly" value="monthly" />
                    <Picker.Item label="Every other month" value="bimonthly" />
                    <Picker.Item label="Once a quarter" value="quarterly" />
                    <Picker.Item label="Twice a year" value="semiannually" />
                    <Picker.Item label="Once a year" value="annually" />
                </Picker>
                <Switch value={formData.skippable} onValueChange={handleSkippableChange} /><Text>This task is skippable</Text>
                <DatePickerInput
                    locale="en"
                    label="Last Performed"
                    value={formData.lastPerformed}
                    onChange={(date) => handleLastPerformedChange(date)}
                    inputMode="start"
                />
                <Button title="Add Task" onPress={() => handleAddTask(dbname, formData)} />
            </View>
        </View>
    );
}

export default AddTaskForm;
