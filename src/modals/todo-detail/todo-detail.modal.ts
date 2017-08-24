import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Todo } from '../../shared/models/todo.model';

@Component({
    selector: 'tja-modal-todo-detail',
    templateUrl: 'todo-detail.modal.html',
})
export class TodoDetailModal {
    // Called from template.
    public todo: Todo;

    private readonly CLASS_NAME = 'CurrentTodoDetailModal';

    constructor(
        params: NavParams,
        public viewController: ViewController
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);

        const paramTodo: Todo = params.get('todo');

        if (paramTodo) {
            this.todo = paramTodo;
        } else {
            this.todo = new Todo();
        }
    }

    // Called from template.
    itemCancelled() {
        console.log('itemCancelled>');
        this.viewController.dismiss();
    }

    // Called from template.
    itemSaved(item: Todo) {
        console.log('itemSaved>', item);
        this.viewController.dismiss(item);
    }
}
