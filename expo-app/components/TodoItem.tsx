import { Todo } from '@/core/keelClient';
import { Ionicons } from '@expo/vector-icons';
import { Observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';
import { Checkbox } from 'expo-checkbox';
import { StyleSheet, TextInput, View } from 'react-native';

export const TodoItem = ({ todo$ }: { todo$: Observable<Todo> }) => {
    const todo = use$(todo$);
    const completed = todo.completed;

    const onToggle = () => {
        todo$.completed.set((completed) => !completed);
    };
    const onChangeText = (text: string) => {
        todo$.text.set(text);
    };
    const onPressDelete = () => {
        todo$.delete();
    };

    console.log('3 - TodoItem');

    return (
        <View style={[styles.todo, completed && styles.viewDone]}>
            <TextInput
                style={[styles.todoText, completed && styles.textDone]}
                value={todo.text}
                multiline
                onChangeText={onChangeText}
                blurOnSubmit
            />
            <Checkbox value={todo.completed || false} style={styles.checkbox} onValueChange={onToggle} />
            <Ionicons name="trash" size={24} color="red" style={styles.deleteButton} onPress={onPressDelete} />
        </View>
    );
};

// Styles for the app.
const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        flex: 1,
        marginBottom: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
        flexShrink: 1,
    },
    checkbox: {
        borderRadius: 6,
        width: 24,
        height: 24,
        marginHorizontal: 8,
    },
    viewDone: {
        opacity: 0.5,
    },
    textDone: {
        textDecorationLine: 'line-through',
    },
    todoText: {
        padding: 16,
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 16,
    },
    deleteButton: {
        paddingHorizontal: 8,
    },
});
