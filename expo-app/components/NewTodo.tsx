import { generateId } from '@/core/generateId';
import { Todo } from '@/core/keelClient';
import { todos$ } from '@/core/state';
import { $, useObservable } from '@legendapp/state/react';
import { StyleSheet } from 'react-native';

interface NewTodoProps {
    idUser: string;
}

export const NewTodo = ({ idUser }: NewTodoProps) => {
    const text$ = useObservable('');

    const addTodo = (text: string) => {
        const id = generateId();
        todos$[id].assign({
            id,
            text,
            idUser: idUser,
            completed: false,
        } as Todo);
    };

    const handleSubmitEditing = () => {
        addTodo(text$.get());
        text$.set('');
    };

    console.log('4 - NewTodo');

    return (
        <$.TextInput
            $value={text$}
            onSubmitEditing={handleSubmitEditing}
            placeholder="What do you want to do?"
            style={styles.input}
        />
    );
};

// Styles for the app.
const styles = StyleSheet.create({
    input: {
        borderColor: '#999',
        borderRadius: 8,
        borderWidth: 2,
        flex: 0,
        height: 64,
        marginBottom: 16,
        padding: 16,
        fontSize: 20,
    },
});
