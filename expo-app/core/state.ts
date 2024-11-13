import { generateId } from '@/core/generateId';
import { Todo } from '@/core/keelClient';
import { observable, syncState, when } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { synced } from '@legendapp/state/sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Setup AsyncStorage plugin with the specific implementation
const pluginAsyncStorage = observablePersistAsyncStorage({
    AsyncStorage,
});

// Setup user$
export const user$ = observable<{ id: string }>(
    synced({
        initial: {},
        persist: {
            plugin: pluginAsyncStorage,
            name: 'user',
        },
    }),
);

// If persist loads without an id, generate one.
when(syncState(user$).isPersistLoaded, () => {
    if (!user$.id.peek()) {
        user$.id.set(generateId());
    }
});

// Setup todos$
export const todos$ = observable<Record<string, Todo>>(
    synced({
        initial: {},
        persist: {
            plugin: pluginAsyncStorage,
            name: 'todos',
        },
    }),
);

// A sorted list of todos
export const todosSorted$ = observable<Todo[]>(() =>
    Object.values(todos$.get()).sort((A, B) => +A.createdAt - +B.createdAt),
);

// numIncompleteTodos$ helper
export const numIncompleteTodos$ = observable(
    () => Object.values(todos$.get()).filter((todo) => !todo.completed).length,
);
