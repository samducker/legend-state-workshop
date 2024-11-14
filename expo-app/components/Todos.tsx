import { NewTodo } from '@/components/NewTodo';
import { TodoList } from '@/components/TodoList';
import { generateId } from '@/core/generateId';
import { Todo } from '@/core/keelClient';
import { useObservable, use$ } from '@legendapp/state/react';
import { StyleSheet, Text, View } from 'react-native';

interface TodosProps {
    idUser: string;
}

export function Todos(props: TodosProps) {
    const todos$ = useObservable<Todo[]>([]);

    console.log('1 - Todos');

    return (
        <View>
            <Text style={styles.heading}>Todos</Text>
            <NewTodo idUser={props.idUser} todos$={todos$} />
            <TodoList todos$={todos$} />
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 16,
    },
});
