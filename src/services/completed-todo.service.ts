import { Observable } from 'rxjs/Observable';

import { ITodoCompleted } from '../models/todo-completed';

export abstract class CompletedTodoService {
    readonly data$: Observable<ITodoCompleted[]>;

    abstract removeItem(
        item: ITodoCompleted,
    ): void;
    abstract saveItem(
        item: ITodoCompleted
    ): void;

    abstract startListening(): void;
    abstract stopListening(): void;
}
