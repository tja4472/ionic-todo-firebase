import { Injectable, NgZone } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
// import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';

import { AuthService } from '../services/auth.service';
import { TodoCompleted } from '../models/todo-completed';

// const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

// Multiple subscriptions on a FirebaseListObservable #574
// https://github.com/angular/angularfire2/issues/574
// beta.7 

// https://coryrylan.com/blog/angular-2-observable-data-services

// https://dzone.com/articles/how-to-build-angular-2-apps-using-observable-data-1

@Injectable()
export class CompletedTodoService {
    private readonly CLASS_NAME = 'CompletedTodoService';

    private dataBehaviorSubject: BehaviorSubject<TodoCompleted[]>;
    private data: TodoCompleted[];

    get data$() {
        return this.dataBehaviorSubject.asObservable();
    }

    private readonly collectionName = 'completed_todos';

    private ref;

    /*
    Currently this is a singleton for the app.
    So constructor gets called once.
    
    Database needs to be requeried when login status changes.
    */
    constructor(
        private authService: AuthService,
        private ngZone: NgZone,
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);
        this.data = [];
        this.dataBehaviorSubject = <BehaviorSubject<TodoCompleted[]>>new BehaviorSubject([]);
    }
    /*
        // =======
        get todos() {
            return this._todos.asObservable();
        }
    
        public reset(): void {
            this.dataStore = { todos: [] };
        }
    */
    public load(
        activeUserId: string,
    ): void {
        console.log('%s:load:activeUserId>', this.CLASS_NAME, activeUserId);

        this.ref = firebase.database().ref('todo/completedTodos');

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
    }

    removeItem(
        todo: TodoCompleted,
    ) {
        console.log('%s:removeItem>', this.CLASS_NAME, todo);
        firebase.database()
            .ref('todo/completedTodos/' + todo.id)
            .remove();
    }

    saveItem(
        todo: TodoCompleted
        ) {
        console.log(`%s:saveItem>`, this.CLASS_NAME, todo);        

        if (todo.id == undefined) {
            // insert.
            firebase.database()
                .ref('todo/completedTodos')
                .push(toFirebaseTodo(todo));
        } else {
            // update.                        
            firebase.database()
                .ref('todo/completedTodos/' + todo.id)
                .set(toFirebaseTodo(todo));
        }

        //   let userId = this.authService.activeUser.value.id;
        //   todo.userId = userId;
        //   this.db.collection(this.collectionName).store(toFirebaseTodo(todo));
    }
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!
// To insert need to remove id PropertyKey.
//
interface FirebaseTodo {
    // id: string;
    description?: string;
    name: string;
    isComplete: boolean;
    // userId: string;
}

function toFirebaseTodo(todo: TodoCompleted): FirebaseTodo {
    //
    let result: FirebaseTodo = {
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