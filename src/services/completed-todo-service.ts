//import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TodoCompleted } from '../models/todo-completed';

export abstract class CompletedTodoService {
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
