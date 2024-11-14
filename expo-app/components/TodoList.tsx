import { TodoItem } from '@/components/TodoItem';
import { store$ } from '@/core/state';
import { use$ } from '@legendapp/state/react';

interface TodoListProps {
    idUser: string;
}

export const TodoList = ({ idUser }: TodoListProps) => {
    const todos = use$(store$.user[idUser].todosSorted, { shallow: true });

    console.log('2 - TodoList');

    return todos.map((todo) => <TodoItem key={todo.id} todo$={store$.user[idUser].todos[todo.id]} />);
};
