import { NewTodo } from '@/components/NewTodo';
import { TodoList } from '@/components/TodoList';
import { StyleSheet, Text, View } from 'react-native';

interface TodosProps {
    idUser: string;
}

export function Todos({ idUser }: TodosProps) {
    console.log('1 - Todos');

    return (
        <View>
            <Text style={styles.heading}>Todos$</Text>
            <NewTodo idUser={idUser} />
            <TodoList idUser={idUser} />
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
