import AddTaskForm from "@/components/addTask";
import { dropTable } from "@/stores/dropTable";
import { initDB } from "@/stores/initDB";
import { useEffect } from "react";
import { Button, View } from "react-native";

const DB_NAME: string = "todoApp";

export default function Index() {

  useEffect(() => {
    console.log("App loaded");
    initDB(DB_NAME);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AddTaskForm dbname={DB_NAME} />
      <Button title="Drop Tasks Table" onPress={() => dropTable(DB_NAME, "TASKS")} />
    </View>
  );
}
