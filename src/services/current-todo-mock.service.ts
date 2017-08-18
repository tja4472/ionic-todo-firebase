import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CurrentTodoService } from './current-todo.service';

import { IReorderArrayIndexes } from '../models/reorder-array-indexes';
import { ITodo } from '../models/todo.model';
import { ITodoCompleted } from '../models/todo-completed';

@Injectable()
export class CurrentTodoServiceMock implements CurrentTodoService {
    private readonly CLASS_NAME = 'CurrentTodoServiceMock';

    private data: ITodo[];
    private dataBehaviorSubject: BehaviorSubject<ITodo[]>;

    get data$() {
        return this.dataBehaviorSubject.asObservable();
    }

    constructor() {
        console.log(`%s:constructor()`, this.CLASS_NAME);
        this.data = this.dummyData();
        this.dataBehaviorSubject = new BehaviorSubject(this.data) as BehaviorSubject<ITodo[]>;
    }

    clearCompletedItems(): void {
        console.log(`%s:clearCompletedItems>`, this.CLASS_NAME);
    }

    moveToCurrent(
        item: ITodoCompleted,
    ): void {
        console.log(`%s:moveToCurrent>`, this.CLASS_NAME, item);
    }

    removeItem(
        item: ITodo,
    ): void {
        console.log(`%s:removeItem>`, this.CLASS_NAME, item);
    }

    reorderItems(
        indexes: IReorderArrayIndexes,
    ): void {
        console.log(`%s:reorderItems>`, this.CLASS_NAME, indexes);
    }

    saveItem(
        item: ITodo
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
        item: ITodo
    ): void {
        console.log(`%s:toggleCompleteItem>`, this.CLASS_NAME, item);
    }

    private dummyData(): ITodo[] {
        const data: ITodo[] =
            [{
                $key: 'AA',
                description: 'AA-description',
                index: 0,
                isComplete: false,
                name: 'AA-name',
                userId: 'a01',
            },
            {
                $key: 'BB',
                description: 'BB-description',
                index: 0,
                isComplete: false,
                name: 'BB-name',
                userId: 'a01',
            },
            {
                $key: 'CC',
                description: 'CC-description',
                index: 0,
                isComplete: true,
                name: 'CC-name',
                userId: 'a01',
            }];

        return data;
    }
}
