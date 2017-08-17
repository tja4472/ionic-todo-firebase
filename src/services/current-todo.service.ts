import { Observable } from 'rxjs/Observable';

import { ReorderArrayIndexes } from '../models/reorder-array-indexes';
import { ITodo } from '../models/todo.model';
import { TodoCompleted } from '../models/todo-completed';

export abstract class CurrentTodoService {
    readonly data$: Observable<ITodo[]>;

    abstract clearCompletedItems(): void;
    abstract moveToCurrent(
        item: TodoCompleted,
    ): void;
    abstract removeItem(
        item: ITodo,
    ): void;
    abstract reorderItems(
        indexes: ReorderArrayIndexes,
    ): void;
    abstract saveItem(
        item: ITodo
    ): void;
    abstract startListening(): void;
    abstract stopListening(): void;
    abstract toggleCompleteItem(
        todo: ITodo
    ): void;
}
