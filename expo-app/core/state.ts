import { Todo } from '@/core/keelClient';
import { observable } from '@legendapp/state';

export const todos$ = observable<Todo[]>([]);
export const numIncompleteTodos$ = observable(() => todos$.get().filter((todo) => !todo.completed).length);
