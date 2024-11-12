import { generateId } from "@/core/generateId";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { getItem, setItem } = useAsyncStorage("my_id");
  const [id, setId] = useState<string | null>(null);

  // get id from async storage or create it
  useMemo(() => {
    getItem().then((id) => {
      if (id) {
        setId(id);
      } else {
        const newId = generateId();
        setItem(newId);
        setId(newId);
      }
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Hi</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 16,
  },
});
