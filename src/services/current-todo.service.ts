import { Observable } from 'rxjs/Observable';

import { IReorderArrayIndexes } from '../models/reorder-array-indexes';
import { ITodo } from '../models/todo.model';
import { ITodoCompleted } from '../models/todo-completed';

export abstract class CurrentTodoService {
    readonly data$: Observable<ITodo[]>;

    abstract clearCompletedItems(): void;
    abstract moveToCurrent(
        item: ITodoCompleted,
    ): void;
    abstract removeItem(
        item: ITodo,
    ): void;
    abstract reorderItems(
        indexes: IReorderArrayIndexes,
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
