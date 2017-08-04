import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as firebase from 'firebase/app';

import { DM_CompletedTodo } from '../database-models/dm-completed-todo';

import { TodoCompleted } from '../models/todo-completed';
import { CompletedTodoService } from './completed-todo.service';

import { AuthService } from '../services/auth.service';
import { DM_CompletedTodoService } from '../services/dm-completed-todo.service';

// Multiple subscriptions on a FirebaseListObservable #574
// https://github.com/angular/angularfire2/issues/574
// beta.7 

// https://coryrylan.com/blog/angular-2-observable-data-services

// https://dzone.com/articles/how-to-build-angular-2-apps-using-observable-data-1

@Injectable()
export class CompletedTodoServiceLive implements CompletedTodoService {
    private readonly CLASS_NAME = 'CompletedTodoService';
    private readonly DB_LIST_KEY = 'completedTodos';
    private readonly DB_USERS_KEY = '/users';

    private data: TodoCompleted[];
    private dataBehaviorSubject: BehaviorSubject<TodoCompleted[]>;

    private databaseReferenceListening: firebase.database.Reference;

    get data$() {
        return this.dataBehaviorSubject.asObservable();
    }

    /*
    Currently this is a singleton for the app.
    So constructor gets called once.
    
    Database needs to be requeried when login status changes.
    */
    constructor(
        private authService: AuthService,
        private dm_CompletedTodoService: DM_CompletedTodoService,
        // private ngZone: NgZone,
    ) {
        console.log(`%s:constructor()`, this.CLASS_NAME);
        this.data = [];
        this.dataBehaviorSubject = <BehaviorSubject<TodoCompleted[]>>new BehaviorSubject([]);
    }

    public startListening(
        // userId: string,
    ): void {
        console.log('%s:startListening()', this.CLASS_NAME);

        if (this.authService.authUser === null) return;
        if (this.authService.authUser.id === null) return;

        this.databaseReferenceListening = firebase.database()
            .ref(this.DB_USERS_KEY)
            .child(this.authService.authUser.id)
            .child(this.DB_LIST_KEY);

        this.databaseReferenceListening
            .orderByChild('index')
            .on('value', snapshot => {
                // console.log('snapshot>', snapshot);
                let arr: TodoCompleted[] = [];

                if (snapshot === null) return;

                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.key === null) return false;
                    arr.push(
                        this.dm_CompletedTodoService.fromDatabase
                            (childSnapshot.key, childSnapshot.val()));
                    return false;
                });

                console.log('arr>', arr);
                this.data = arr;
                // NgZone.isInAngularZone() = false
                // console.log('isInAngularZone()-2>', NgZone.isInAngularZone());
                // this.ngZone.run(() => {
                // NgZone.isInAngularZone() = true
                // console.log('isInAngularZone()-3>', NgZone.isInAngularZone());
                // this._todos.next(Object.assign({}, this.dataStore).todos);
                this.dataBehaviorSubject.next(Object.assign([], this.data));
                // });
            });
    }

    public stopListening(): void {
        console.log('%s:stopListening()', this.CLASS_NAME);

        if (this.databaseReferenceListening != null) {
            this.databaseReferenceListening.off();
            // this.databaseReferenceListening = null;
        }
    }

    removeItem(
        item: TodoCompleted,
    ) {
        console.log('%s:removeItem>', this.CLASS_NAME, item);

        if (this.authService.authUser === null) return;
        if (this.authService.authUser.id === null) return;
        if (item.id === undefined) return;

        firebase.database()
            .ref(this.DB_USERS_KEY)
            .child(this.authService.authUser.id)
            .child(this.DB_LIST_KEY)
            .child(item.id)
            .remove();
    }

    saveItem(
        item: TodoCompleted
    ) {
        console.log(`%s:saveItem>`, this.CLASS_NAME, item);
        if (this.authService.authUser === null) return;
        if (this.authService.authUser.id === null) return;

        if (item.id === undefined) {
            // insert.
            firebase.database()
                .ref(this.DB_USERS_KEY)
                .child(this.authService.authUser.id)
                .child(this.DB_LIST_KEY)
                .push(toFirebaseTodo(item));
        } else {
            // update.                        
            firebase.database()
                .ref(this.DB_USERS_KEY)
                .child(this.authService.authUser.id)
                .child(this.DB_LIST_KEY)
                .child(item.id)
                .set(toFirebaseTodo(item));
        }
    }
}

function toFirebaseTodo(todo: TodoCompleted): DM_CompletedTodo {
    //
    let result: DM_CompletedTodo = {
        // id: todo.id,
        //id: undefined,
        description: todo.description,
        name: todo.name,
        isComplete: todo.isComplete,
        // userId: todo.userId,
    };

    console.log('toFirebaseTodo>', result);
    return result;
}
/*
function fromDatabase(x: any[]): TodoCompleted[] {
    console.log('fromFirebaseTodo');

    let result = x.map(d => fromFirebaseTodo(d));

    return result;
}
*/
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

