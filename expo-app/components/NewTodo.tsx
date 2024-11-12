import { generateId } from '@/core/generateId';
import { Todo } from '@/core/keelClient';
import { todos$ } from '@/core/state';
import { $, useObservable } from '@legendapp/state/react';
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData } from 'react-native';

interface NewTodoProps {
    idUser: string;
}

export const NewTodo = ({ idUser }: NewTodoProps) => {
    const text$ = useObservable('');

    const addTodo = (text: string) => {
        todos$.push({
            id: generateId(),
            text,
            idUser: idUser,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
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
