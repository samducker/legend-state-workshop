import { TodoItem } from '@/components/TodoItem';
import { todos$, todosSorted$ } from '@/core/state';
import { use$ } from '@legendapp/state/react';

interface TodoListProps {}

export const TodoList = ({}: TodoListProps) => {
    const todos = use$(todosSorted$, { shallow: true });

    console.log('2 - TodoList');

    return todos.map((todo) => <TodoItem key={todo.id} todo$={todos$[todo.id]} />);
};
