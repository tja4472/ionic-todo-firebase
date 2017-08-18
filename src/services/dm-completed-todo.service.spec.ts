import { DmCompletedTodoService } from './dm-completed-todo.service';
import { DM_CompletedTodo } from '../database-models/dm-completed-todo';

import { TodoCompleted } from '../models/todo-completed';

const data: DM_CompletedTodo = {
    description: 'description',
    isComplete: false,
    name: 'name',
};

const expected: TodoCompleted = {
    description: 'description',
    id: 'id1',
    isComplete: false,
    name: 'name',
    userId: 'uu',
};

describe('DM_CompletedTodoService', () => {
    it('fromDatabase', () => {
        const dmCompletedTodoService = new DmCompletedTodoService();
        const result = dmCompletedTodoService.fromDatabase('id1', data);
        expect(result).toEqual(expected);
    });
});
