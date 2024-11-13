import { Todo } from '@/core/keelClient';
import { observable } from '@legendapp/state';

export const todos$ = observable<Record<string, Todo>>({});

// A sorted list of todos
export const todosSorted$ = observable<Todo[]>(() =>
    Object.values(todos$.get()).sort((A, B) => +A.createdAt - +B.createdAt),
);

// numIncompleteTodos$ helper
export const numIncompleteTodos$ = observable(
    () => Object.values(todos$.get()).filter((todo) => !todo.completed).length,
);
