import { generateId } from '@/core/generateId';
import { APIClient, Todo } from '@/core/keelClient';
import { observable, syncState, when } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { syncedKeel } from '@legendapp/state/sync-plugins/keel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keel = new APIClient({
    baseUrl: 'https://staging-keel-demos-cGUFmA.keelapps.xyz/api',
});

const { queries, mutations } = keel.api;

// Setup AsyncStorage plugin with the specific implementation
const pluginAsyncStorage = observablePersistAsyncStorage({
    AsyncStorage,
});

export const user$ = observable<{ id: string }>(
    syncedKeel({
        client: keel,
        initial: { id: '' },
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
    syncedKeel({
        client: keel,
        initial: {} as Record<string, Todo>,
        list: () => queries.listTodos({ where: { idUser: { equals: user$.id.get() } } }),
        create: mutations.createTodo,
        update: mutations.updateTodo,
        delete: mutations.deleteTodo,
        persist: {
            plugin: pluginAsyncStorage,
            name: 'todos',
        },
        as: 'object',
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
