import { Todo } from '@/core/keelClient';
import { observable } from '@legendapp/state';

export const todos$ = observable<Todo[]>([]);
