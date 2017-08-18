import { Injectable } from '@angular/core';

import { IDmCompletedTodo } from '../database-models/dm-completed-todo';

import { ITodoCompleted } from '../models/todo-completed';

@Injectable()
export class DmCompletedTodoService {
    private readonly CLASS_NAME: string = 'DM_CompletedTodoService';

    constructor() {
        console.log(`%s:constructor()`, this.CLASS_NAME);
    }

    public fromDatabase(
        id: string,
        data: IDmCompletedTodo,
    ): ITodoCompleted {
        console.log(`%s:fromDatabase()`, this.CLASS_NAME);

        const expected: ITodoCompleted = {
            description: data.description,
            id,
            isComplete: data.isComplete,
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
