import { Observable } from 'rxjs/Observable';

import { ITodoCompleted } from '../models/todo-completed';

import { IReorderArrayIndexes } from '../shared/models/reorder-array-indexes';
import { Todo } from '../shared/models/todo.model';

export abstract class CurrentTodoService {
    readonly data$: Observable<Todo[]>;

    abstract clearCompletedItems(): void;
    abstract moveToCurrent(
        item: ITodoCompleted,
    ): void;
    abstract removeItem(
        item: Todo,
    ): void;
    abstract reorderItems(
        indexes: IReorderArrayIndexes,
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
