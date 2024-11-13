import { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData } from 'react-native';

interface NewTodoProps {
    addTodo: (text: string) => void;
}

export const NewTodo = ({ addTodo }: NewTodoProps) => {
    const [text, setText] = useState('');
    const handleSubmitEditing = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        setText('');
        addTodo(text);
    };

    console.log('4 - NewTodo');

    return (
        <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            onSubmitEditing={handleSubmitEditing}
            placeholder="What do you want to do?"
            style={styles.input}
        />
    );
};

// Styles for the app.
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        margin: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderColor: '#999',
        borderRadius: 8,
        borderWidth: 2,
        flex: 0,
        height: 64,
        marginVertical: 16,
        padding: 16,
        fontSize: 20,
    },
    todos: {
        flex: 1,
        marginTop: 16,
    },
    todo: {
        borderRadius: 8,
        flex: 1,
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#ffd',
    },
    todoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    done: {
        backgroundColor: '#dfd',
    },
    todoText: {
        fontSize: 20,
    },
    deleteIcon: {
        fontSize: 20,
    },
    delete: {
        padding: 16,
    },
    clearTodos: {
        margin: 16,
        flex: 0,
        textAlign: 'center',
        fontSize: 16,
    },
});
