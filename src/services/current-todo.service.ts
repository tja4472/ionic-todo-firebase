import { Injectable, NgZone } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';

import { reorderArray } from 'ionic-angular';

import { AuthService } from '../services/auth.service';
import { CompletedTodoService } from '../services/completed-todo.service';

import { ReorderArrayIndexes } from '../models/reorder-array-indexes';
import { Todo } from '../models/todo';
import { TodoCompleted } from '../models/todo-completed';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

// Multiple subscriptions on a FirebaseListObservable #574
// https://github.com/angular/angularfire2/issues/574
// beta.7 

// https://coryrylan.com/blog/angular-2-observable-data-services

// https://dzone.com/articles/how-to-build-angular-2-apps-using-observable-data-1

@Injectable()
export class CurrentTodoService {
    private readonly CLASS_NAME = 'CurrentTodoService';

    private dataBehaviorSubject: BehaviorSubject<Todo[]>;
    /*    
        private dataStore: {  // This is where we will store our data in memory
            todos: Todo[]
        };
    */
    private data: Todo[];

    get todos() {
        return this.dataBehaviorSubject.asObservable();
    }

    private readonly collectionName = 'current_todos';

    private ref;

    /*
    Currently this is a singleton for the app.
    So constructor gets called once.
    
    Database needs to be requeried when login status changes.
    */
    constructor(
        private authService: AuthService,
        private completedTodoService: CompletedTodoService,
        private ngZone: NgZone,
    ) {
        console.log('%s:constructor', this.CLASS_NAME);
        this.data = [];
        this.dataBehaviorSubject = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    }

    public clearCompletedItems(): void {
        console.log('%s:clearCompletedItems', this.CLASS_NAME);
        let completedItems = this.data.filter(a => a.isComplete);
        console.log('%s:completedItems>', this.CLASS_NAME, completedItems);

        completedItems.map(x => {
            console.log('x>', x);
            /*
                private todo: TodoCompleted =
                {
                  id: undefined,
                  isComplete: false,
                  description: null,
                  name: '',
                  userId: '',
                };
            */

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
        let todo: Todo = {
            id: undefined,
            description: item.description,
            name: item.name,
            isComplete: false,
            index: 0,
            userId: item.userId,
        };

        this.saveItem(todo);
        this.completedTodoService.removeItem(item);
    }

    // =======

    public reset(): void {
        console.log('CurrentTodoService#reset');
        this.data = [];
        this.dataBehaviorSubject = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    }

    public load(
        activeUserId: string,
    ): void {
        console.log('TodoService:load:activeUserId>', activeUserId);

        this.ref = firebase.database()
            .ref('todo/currentTodos')
            .orderByChild('index');

        this.ref.on('value', snapshot => {
            // console.log('snapshot>', snapshot);
            let arr = [];

            snapshot.forEach((childSnapshot) => {
                // var data = childSnapshot.val()
                // data['id'] = childSnapshot.key
                // arr.push(data);

                // console.log('data>', data);
                // return false;

                // let xx = fromFirebaseTodo(childSnapshot.key, data);  
                // let xx = fromFirebaseTodo                    (childSnapshot.key, childSnapshot.val());
                // console.log('xx>', xx);
                // arr.push(xx);
                arr.push(
                    fromFirebaseTodo
                        (childSnapshot.key, childSnapshot.val()));
            });

            console.log('arr>', arr);
            this.data = arr;
            // NgZone.isInAngularZone() = false
            // console.log('isInAngularZone()-2>', NgZone.isInAngularZone());
            this.ngZone.run(() => {
                // NgZone.isInAngularZone() = true
                // console.log('isInAngularZone()-3>', NgZone.isInAngularZone());
                // this._todos.next(Object.assign({}, this.dataStore).todos);
                this.dataBehaviorSubject.next(Object.assign([], this.data));
            });
        });

        /*
        this.ref.once('value', snapshot => {
            console.log('snapshot>', snapshot);
                  snapshot.forEach((childSnapshot) => {
                    var data = childSnapshot.val()
                    data['id'] = childSnapshot.key
                    // arr.push(data);
        
                    console.log('data>', data);
                    // return false;
                  });    
        });
        */
        // this._todos = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
        /*        
                this.db.collection(this.collectionName)
                    .order("index", "ascending")
                    .findAll({ userId: activeUserId })
                    .watch()
                    .do(x => console.log('TodoService:watch>', x))
                    // replace this with one function.
                    //.map(x => x.map(d => fromFirebaseTodo(d)))
                    .map(x => fromDatabase(x))
                    .subscribe(
                    result3 => {
                        console.log('TodosPage:result3>', result3);
                        this.dataStore.todos = result3;
                        this._todos.next(Object.assign({}, this.dataStore).todos);
                    },
                    err => { console.error(err); }
                    );
        */
    }

    // =======

    reorderItems(
        indexes: ReorderArrayIndexes,
    ) {
        console.log('%s:reorderItems:indexes>', this.CLASS_NAME, indexes);
        const itemsToSave = [...this.data];
        reorderArray(itemsToSave, indexes);

        let updates = {};
        for (let x = 0; x < itemsToSave.length; x++) {
            updates['todo/currentTodos/' + itemsToSave[x].id + '/index'] = x;
        }

        firebase.database().ref().update(updates);
    }

    removeItem(
        todo: Todo,
    ) {
        console.log('%s:removeItem>', this.CLASS_NAME, todo);
        firebase.database()
            .ref('todo/currentTodos/' + todo.id)
            .remove();
    }

    saveItem(
        todo: Todo,
    ) {
        console.log('%s:saveItem>', this.CLASS_NAME, todo);
        if (todo.id == undefined) {
            // insert.
            firebase.database()
                .ref('todo/currentTodos')
                .push(toFirebaseTodo(todo));
        } else {
            // update.                        
            firebase.database()
                .ref('todo/currentTodos/' + todo.id)
                .set(toFirebaseTodo(todo));
        }
    }

    public toggleCompleteItem(
        todo: Todo
        ): void {
        console.log('%s:toggleCompleteItem>', this.CLASS_NAME, todo);            
        todo.isComplete = !todo.isComplete;
        this.saveItem(todo);
    }

    private dummyData(): Observable<Todo[]> {
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
                isComplete: false,
                userId: 'a01',
            }];

        return Observable.of(data);
    }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!
// To insert need to remove id PropertyKey.
//
interface FirebaseTodo {
    // id: string;
    description?: string;
    index: number;
    name: string;
    isComplete: boolean;
    // userId: string;
}

function toFirebaseTodo(todo: Todo): FirebaseTodo {
    //
    let result: FirebaseTodo = {
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
): Todo {
    console.log('fromFirebaseTodo');

    let result: Todo = {
        id: id,
        description: x.description,
        index: x.index,
        isComplete: x.isComplete,
        name: x.name,
        //userId: x.userId,
        userId: 'aaa',
    };

    if (result.description === undefined) {
        result.description = null;
    }

    if (result.isComplete === undefined) {
        result.isComplete = false;
    }

    return result;
}