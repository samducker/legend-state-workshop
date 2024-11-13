import { generateId } from '@/core/generateId';
import { Todo } from '@/core/keelClient';
import { Observable } from '@legendapp/state';
import { use$, useObservable } from '@legendapp/state/react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData } from 'react-native';

interface NewTodoProps {
    idUser: string;
    todos$: Observable<Todo[]>;
}

export const NewTodo = ({ idUser, todos$ }: NewTodoProps) => {
    const text$ = useObservable('');
    const text = use$(text$);

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

    const handleSubmitEditing = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        text$.set('');
        addTodo(text);
    };

    console.log('4 - NewTodo');

    return (
        <TextInput
            value={text}
            onChangeText={(text) => text$.set(text)}
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
