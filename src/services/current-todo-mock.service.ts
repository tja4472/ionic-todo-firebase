import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { CurrentTodoService } from './current-todo.service';

import { ReorderArrayIndexes } from '../models/reorder-array-indexes';
import { Todo } from '../models/todo';
import { TodoCompleted } from '../models/todo-completed';

@Injectable()
export class CurrentTodoServiceMock implements CurrentTodoService {
    private readonly CLASS_NAME = 'CurrentTodoServiceMock';

    private data: Todo[];
    private dataBehaviorSubject: BehaviorSubject<Todo[]>;

    get data$() {
        return this.dataBehaviorSubject.asObservable();
    }

    constructor() {
        console.log(`%s:constructor()`, this.CLASS_NAME);
        this.data = this.dummyData();
        this.dataBehaviorSubject = <BehaviorSubject<Todo[]>>new BehaviorSubject(this.data);
    }

    clearCompletedItems(): void {
        console.log(`%s:clearCompletedItems>`, this.CLASS_NAME);
    }

    moveToCurrent(
        item: TodoCompleted,
    ): void {
        console.log(`%s:moveToCurrent>`, this.CLASS_NAME, item);
    }

    removeItem(
        item: Todo,
    ): void {
        console.log(`%s:removeItem>`, this.CLASS_NAME, item);
    }

    reorderItems(
        indexes: ReorderArrayIndexes,
    ): void {
        console.log(`%s:reorderItems>`, this.CLASS_NAME, indexes);
    }

    saveItem(
        item: Todo
    ): void {
        console.log(`%s:saveItem>`, this.CLASS_NAME, item);
    }

    startListening(): void {
        console.log(`%s:startListening>`, this.CLASS_NAME);
    }

    stopListening(): void {
        console.log(`%s:stopListening>`, this.CLASS_NAME);
    }

    toggleCompleteItem(
        item: Todo
    ): void {
        console.log(`%s:toggleCompleteItem>`, this.CLASS_NAME, item);
    }

    private dummyData(): Todo[] {
        let data: Todo[] =
            [{
                id: 'AA',
                description: 'AA-description',
                name: 'AA-name',
                index: 0,
                isComplete: false,
                userId: 'a01',
            },
            {
                id: 'BB',
                description: 'BB-description',
                name: 'BB-name',
                index: 0,
                isComplete: false,
                userId: 'a01',
            },
            {
                id: 'CC',
                description: 'CC-description',
                name: 'CC-name',
                index: 0,
                isComplete: true,
                userId: 'a01',
            }];

        return data;
    }
}