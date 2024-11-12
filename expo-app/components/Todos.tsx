import { NewTodo } from "@/components/NewTodo";
import { TodoList } from "@/components/TodoList";
import { generateId } from "@/core/generateId";
import { Todo } from "@/core/keelClient";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

interface TodosProps {
  idUser: string;
}

export function Todos(props: TodosProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: generateId(),
        text,
        idUser: props.idUser,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };
  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  return (
    <View>
      <Text style={styles.heading}>Todos</Text>
      <NewTodo addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
