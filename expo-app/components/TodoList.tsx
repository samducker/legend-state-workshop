import { TodoItem } from '@/components/TodoItem';
import { Todo } from '@/core/keelClient';

interface TodoListProps {
    todos: Todo[];
    updateTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, updateTodo, deleteTodo }: TodoListProps) => {
    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />);
};
