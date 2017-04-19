import { Injectable } from '@angular/core';

import { DM_CompletedTodo } from '../database-models/dm-completed-todo';

import { TodoCompleted } from '../models/todo-completed';

@Injectable()
export class DM_CompletedTodoService {
    private readonly CLASS_NAME: string = 'DM_CompletedTodoService';

    constructor() {
        console.log(`%s:constructor()`, this.CLASS_NAME);
    }

    public fromDatabase(
        id: string,
        data: DM_CompletedTodo,
    ): TodoCompleted {
        console.log(`%s:fromDatabase()`, this.CLASS_NAME);

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
/*
function fromFirebaseTodo(
    id: string,
    x: any
): TodoCompleted {
    console.log('fromFirebaseTodo');

    let result: TodoCompleted = {
        id: id,
        description: x.description,
        isComplete: x.isComplete,
        name: x.name,
        userId: x.userId,
    };

    if (result.description === undefined) {
        result.description = null;
    }

    if (result.isComplete === undefined) {
        result.isComplete = false;
    }

    return result;
}
*/
