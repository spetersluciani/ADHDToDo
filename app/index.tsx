import { initDB } from "@/stores/initDB";
import { useEffect } from "react";
import { Text, View } from "react-native";

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
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
