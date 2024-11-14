import { Todo } from '@/core/keelClient';
import { observable, syncState, when } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from './generateId';
import { synced } from '@legendapp/state/sync';

const pluginAsyncStorage = observablePersistAsyncStorage({
    AsyncStorage,
});

export const user$ = observable<{ id: string }>(
    synced({
        initial: {},
        persist: {
            plugin: pluginAsyncStorage,
            name: 'user',
        },
    }),
);

when(syncState(user$).isPersistLoaded, () => {
    if (!user$.id.peek()) {
        user$.id.set(generateId());
    }
});

export const todos$ = observable<Record<string, Todo>>(
    synced({
        initial: {},
        persist: {
            plugin: pluginAsyncStorage,
            name: 'todos',
        },
    }),
);

export const todosSorted$ = observable<Todo[]>(() =>
    Object.values(todos$.get()).sort((A, B) => +A.createdAt - +B.createdAt),
);

export const numIncompleteTodos$ = observable(
    () => Object.values(todos$.get()).filter((todo) => !todo.completed).length,
);
