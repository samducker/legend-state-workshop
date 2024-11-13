import { TodoItem } from '@/components/TodoItem';
import { Todo } from '@/core/keelClient';
import { Observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';

interface TodoListProps {
    todos$: Observable<Todo[]>;
}

export const TodoList = ({ todos$ }: TodoListProps) => {
    const todos = use$(todos$);

    console.log('2 - TodoList');

    return todos.map((todo, i) => <TodoItem key={todo.id} todo$={todos$[i]} />);
};
