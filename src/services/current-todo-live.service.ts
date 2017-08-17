import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as firebase from 'firebase/app';

import { reorderArray } from 'ionic-angular';

import { AuthService } from '../services/auth.service';

import { CompletedTodoService } from '../services/completed-todo.service';
import { CurrentTodoService } from './current-todo.service';

import { ReorderArrayIndexes } from '../models/reorder-array-indexes';

import { DM_CurrentTodo } from '../database-models/dm-current-todo';

import { ITodo } from '../models/todo.model';
import { TodoCompleted } from '../models/todo-completed';



// Multiple subscriptions on a FirebaseListObservable #574
// https://github.com/angular/angularfire2/issues/574
// beta.7 

// https://coryrylan.com/blog/angular-2-observable-data-services

// https://dzone.com/articles/how-to-build-angular-2-apps-using-observable-data-1

@Injectable()
export class CurrentTodoServiceLive implements CurrentTodoService {
    private readonly CLASS_NAME = 'CurrentTodoService';
    private readonly DB_LIST_KEY = 'currentTodos';
    private readonly DB_USERS_KEY = '/users';

    private data: ITodo[];
    private dataBehaviorSubject: BehaviorSubject<ITodo[]>;

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
        private completedTodoService: CompletedTodoService,
        // private ngZone: NgZone,
    ) {
        console.log('%s:constructor()', this.CLASS_NAME);
        this.data = [];
        this.dataBehaviorSubject = <BehaviorSubject<ITodo[]>>new BehaviorSubject([]);
    }

    public clearCompletedItems(): void {
        console.log('%s:clearCompletedItems', this.CLASS_NAME);
        let completedItems = this.data.filter(a => a.isComplete);
        console.log('%s:completedItems>', this.CLASS_NAME, completedItems);

        completedItems.map(x => {
            let todoCompleted: TodoCompleted =
                {
                    id: undefined,
                    isComplete: x.isComplete,
                    description: x.description,
                    name: x.name,
                    userId: x.userId,
                };

            this.completedTodoService.saveItem(todoCompleted);
            this.removeItem(x);
        });
    }

    public moveToCurrent(
        item: TodoCompleted,
    ): void {
        console.log('%s:clearCompletedItems', this.CLASS_NAME, item);
        let todo: ITodo = {
            $key: undefined,
            description: item.description,
            name: item.name,
            isComplete: false,
            index: 0,
            userId: item.userId,
        };

        this.saveItem(todo);
        this.completedTodoService.removeItem(item);
    }

    /*
        public reset(): void {
            console.log('CurrentTodoService#reset');
            this.data = [];
            this.dataBehaviorSubject = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
        }
    */
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
                if (snapshot === null) return;

                let arr: ITodo[] = [];

                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.key === null) return false;

                    arr.push(
                        fromFirebaseTodo
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

    reorderItems(
        indexes: ReorderArrayIndexes,
    ) {
        console.log('%s:reorderItems():indexes>', this.CLASS_NAME, indexes);
        if (this.authService.authUser === null) return;
        if (this.authService.authUser.id === null) return;

        const itemsToSave = [...this.data];
        reorderArray(itemsToSave, indexes);

        let updates: any = {};
        for (let x = 0; x < itemsToSave.length; x++) {
            updates[itemsToSave[x].$key + '/index'] = x;
        }

        //this.databaseReference.update(updates);
        firebase.database()
            .ref(this.DB_USERS_KEY)
            .child(this.authService.authUser.id)
            .child(this.DB_LIST_KEY)
            .update(updates);
    }

    removeItem(
        item: ITodo,
    ) {
        console.log('%s:removeItem>', this.CLASS_NAME, item);
        if (this.authService.authUser === null) return;
        if (this.authService.authUser.id === null) return;
        if (item.$key === undefined) return;

        // this.databaseReference
        //  .child(item.id)
        //  .remove();
        firebase.database()
            .ref(this.DB_USERS_KEY)
            .child(this.authService.authUser.id)
            .child(this.DB_LIST_KEY)
            .child(item.$key)
            .remove();
    }

    saveItem(
        item: ITodo,
    ) {
        console.log('%s:saveItem>', this.CLASS_NAME, item);
        if (this.authService.authUser === null) return;
        if (this.authService.authUser.id === null) return;
        if (item.$key == undefined) {
            // insert.
            // this.databaseReference
            // .push(toFirebaseTodo(item));
            firebase.database()
                .ref(this.DB_USERS_KEY)
                .child(this.authService.authUser.id)
                .child(this.DB_LIST_KEY)
                .push(toFirebaseTodo(item));
        } else {
            // update.                        
            //this.databaseReference
            // .child(item.id)
            // .set(toFirebaseTodo(item));
            firebase.database()
                .ref(this.DB_USERS_KEY)
                .child(this.authService.authUser.id)
                .child(this.DB_LIST_KEY)
                .child(item.$key)
                .set(toFirebaseTodo(item));
        }
    }

    public toggleCompleteItem(
        todo: ITodo
    ): void {
        console.log('%s:toggleCompleteItem>', this.CLASS_NAME, todo);
        todo.isComplete = !todo.isComplete;
        this.saveItem(todo);
    }
}


function toFirebaseTodo(todo: ITodo): DM_CurrentTodo {
    //
    let result: DM_CurrentTodo = {
        // id: todo.id,
        //id: undefined,
        description: todo.description,
        index: todo.index,
        name: todo.name,
        isComplete: todo.isComplete,
        //userId: todo.userId,
        // userId: 'aaa',
    };

    console.log('toFirebaseTodo>', result);
    return result;
}

// toDataModel
/*
function fromDatabase(x: any[]): Todo[] {
    console.log('fromFirebaseTodo');

    let result = x.map(d => fromFirebaseTodo(d));

    return result;
}
*/

function fromFirebaseTodo(
    id: string,
    x: any
): ITodo {
    console.log('fromFirebaseTodo');

    let result: ITodo = {
        $key: id,
        description: x.description,
        index: x.index,
        isComplete: x.isComplete,
        name: x.name,
        //userId: x.userId,
        userId: 'aaa',
    };

    /*
        if (result.description === undefined) {
            result.description = null;
        }
    */
    if (result.isComplete === undefined) {
        result.isComplete = false;
    }

    return result;
}