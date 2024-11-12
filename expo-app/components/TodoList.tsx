import { TodoItem } from '@/components/TodoItem';
import { todos$ } from '@/core/state';
import { use$ } from '@legendapp/state/react';

interface TodoListProps {}

export const TodoList = ({}: TodoListProps) => {
    const todos = use$(todos$);

    console.log('2 - TodoList');

    return todos.map((todo, i) => <TodoItem key={todo.id} todo$={todos$[i]} />);
};
