import { Observable } from 'rxjs/Observable';

import { ReorderArrayIndexes } from '../models/reorder-array-indexes';
import { Todo } from '../models/todo';
import { TodoCompleted } from '../models/todo-completed';

export abstract class CurrentTodoService {
    readonly data$: Observable<Todo[]>;

    abstract clearCompletedItems(): void;
    abstract moveToCurrent(
        item: TodoCompleted,
    ): void;
    abstract removeItem(
        item: Todo,
    ): void;
    abstract reorderItems(
        indexes: ReorderArrayIndexes,
    ): void;
    abstract saveItem(
        item: Todo
    ): void;
    abstract startListening(): void;
    abstract stopListening(): void;
    abstract toggleCompleteItem(
        todo: Todo
    ): void;
}
