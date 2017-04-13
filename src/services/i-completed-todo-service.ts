//import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TodoCompleted } from '../models/todo-completed';

export abstract class ICompletedTodoService {
    readonly data$: Observable<TodoCompleted[]>;

    removeItem(
        item: TodoCompleted,
    ): void { };
    abstract saveItem(
        item: TodoCompleted
    ): void;

    startListening(): void { };
    stopListening(): void { };
}

// export const COMPLETED_TODO_SERVICE = new OpaqueToken('ICompletedTodoService');
// export const COMPLETED_TODO_SERVICE = new InjectionToken<ICompletedTodoService>('ICompletedTodoService');