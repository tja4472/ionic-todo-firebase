import { DM_CompletedTodoService } from './dm-completed-todo.service';
import { DM_CompletedTodo } from '../database-models/dm-completed-todo';

import { TodoCompleted } from '../models/todo-completed';

let data: DM_CompletedTodo = {
    description: 'description',
    isComplete: false,
    name: 'name',
};

let expected: TodoCompleted = {
    description: 'description',
    isComplete: false,
    id: 'id1',
    name: 'name',
    userId: 'uu',
};

describe('DM_CompletedTodoService', () => {
    it('fromFirebaseTodo', () => {
        let dm_CompletedTodoService = new DM_CompletedTodoService();
        let result = dm_CompletedTodoService.fromFirebaseTodo('id1', data);
        expect(result).toEqual(expected);
    });
});
