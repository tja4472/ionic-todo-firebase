import { OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TodoCompleted } from '../models/todo-completed';

export interface ICompletedTodoService {
    readonly data$: Observable<TodoCompleted[]>;

    removeItem(
        item: TodoCompleted,
    ): void;
    saveItem(
        item: TodoCompleted
    ): void;

    startListening(): void;
    stopListening(): void;
}

export const COMPLETED_TODO_SERVICE = new OpaqueToken('ICompletedTodoService');