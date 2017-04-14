import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TodoCompleted } from '../models/todo-completed';
import { CompletedTodoService } from './completed-todo.service';

@Injectable()
export class CompletedTodoServiceMock implements CompletedTodoService {
    private readonly CLASS_NAME = 'CompletedTodoServiceMock';

    private data: TodoCompleted[];
    private dataBehaviorSubject: BehaviorSubject<TodoCompleted[]>;

    get data$() {
        return this.dataBehaviorSubject.asObservable();
    }

    constructor() {
        console.log(`%s:constructor()`, this.CLASS_NAME);
        this.data = this.dummyData();
        this.dataBehaviorSubject = <BehaviorSubject<TodoCompleted[]>>new BehaviorSubject(this.data);
    }

    removeItem(
        item: TodoCompleted,
    ): void {
        console.log(`%s:removeItem>`, this.CLASS_NAME, item);
    }

    saveItem(
        item: TodoCompleted
    ): void {
        console.log(`%s:saveItem>`, this.CLASS_NAME, item);
    }

    startListening(): void {
        console.log(`%s:startListening>`, this.CLASS_NAME);
    }

    stopListening(): void {
        console.log(`%s:stopListening>`, this.CLASS_NAME);
    }

    private dummyData(): TodoCompleted[] {
        let data: TodoCompleted[] =
            [{
                id: 'AA',
                description: 'AA-description',
                name: 'AA-name',
                isComplete: true,
                userId: 'a01',
            },
            {
                id: 'BB',
                description: 'BB-description',
                name: 'BB-name',
                isComplete: true,
                userId: 'a01',
            },
            {
                id: 'CC',
                description: 'CC-description',
                name: 'CC-name',
                isComplete: true,
                userId: 'a01',
            }];

        return data;
    }
}

