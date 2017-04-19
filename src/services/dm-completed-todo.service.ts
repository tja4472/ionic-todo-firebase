import { Injectable } from '@angular/core';

import { DM_CompletedTodo } from '../database-models/dm-completed-todo';

import { TodoCompleted } from '../models/todo-completed';

@Injectable()
export class DM_CompletedTodoService {
    private readonly CLASS_NAME: string = 'GreatDealsConvert';

    constructor() {
        console.log(`%s:constructor()`, this.CLASS_NAME);
    }

    public fromFirebaseTodo(
        id: string,
        data: DM_CompletedTodo,
    ): TodoCompleted {
        console.log(`%s:fromFirebaseTodo()`, this.CLASS_NAME);

        let expected: TodoCompleted = {
            description: data.description,
            isComplete: data.isComplete,
            id: id,
            name: data.name,
            userId: 'uu',
        };
        return expected;
    }
}