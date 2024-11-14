import { generateId } from '@/core/generateId';
import { APIClient, Todo } from '@/core/keelClient';
import { observable, syncState, when } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { configureSynced, synced } from '@legendapp/state/sync';
import { syncedKeel } from '@legendapp/state/sync-plugins/keel';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Setup AsyncStorage plugin with the specific implementation
const pluginAsyncStorage = observablePersistAsyncStorage({
    AsyncStorage,
});

const getUserFromUrl = () => {
    if (typeof window?.location !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const param = searchParams.get('idUser');
        return param ? { id: searchParams.get('idUser') } : null;
    }
    return null;
};

// Setup user$
export const user$ = observable<{ id: string }>(
    () =>
        getUserFromUrl() ||
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

// Setup Keel
const keel = new APIClient({
    baseUrl: 'https://staging-keel-demos-cGUFmA.keelapps.xyz/api',
});

const { queries, mutations } = keel.api;

// Setup todos$
export const todos$ = observable<Record<string, Todo>>(
    syncedKeel({
        client: keel,
        initial: {} as Record<string, Todo>,
        list: () => queries.listTodos({ where: { idUser: { equals: user$.id.get() } } }),
        create: mutations.createTodo,
        update: mutations.updateTodo,
        delete: mutations.deleteTodo,
        requireAuth: false,
        waitFor: user$.id,
        as: 'object',
        persist: {
            plugin: pluginAsyncStorage,
            name: 'todos',
        },
    }),
);

const sync = configureSynced(syncedKeel, {
    client: keel,
    persist: {
        plugin: pluginAsyncStorage,
    },
    requireAuth: false,
    waitFor: user$.id,
    as: 'object',
});

export const store$ = observable({
    users: sync({
        list: () => queries.listUsers(),
        persist: {
            name: 'users',
        },
    }),
    user: (idUser: string) => ({
        todos: sync({
            initial: {} as Record<string, Todo>,
            list: () => queries.listTodos({ where: { idUser: { equals: idUser } } }),
            create: mutations.createTodo,
            update: mutations.updateTodo,
            delete: mutations.deleteTodo,
            persist: {
                name: 'todos' + idUser,
            },
        }),
        todosSorted: (): Todo[] =>
            Object.values(store$.user[idUser].todos.get()).sort((A: Todo, B: Todo) => +A.createdAt - +B.createdAt),
        numIncompleteTodos: (idUser: string): number =>
            Object.values(store$.user[idUser].todos.get()).filter(
                (todo): todo is Todo => todo !== null && !todo.completed,
            ).length,
    }),
});

// A sorted list of todos
export const todosSorted$ = observable<Todo[]>(() =>
    Object.values(todos$.get()).sort((A, B) => +A.createdAt - +B.createdAt),
);

// numIncompleteTodos$ helper
export const numIncompleteTodos$ = observable(
    () => Object.values(todos$.get()).filter((todo) => !todo.completed).length,
);
