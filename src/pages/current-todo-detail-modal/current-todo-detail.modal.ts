import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Todo } from '../../models/todo';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export interface CurrentTodoDetailModalParam {
    data?: Todo;
    isEdited: boolean;
}

@Component({
    selector: 'modal-current-todo-detail',
    templateUrl: 'current-todo-detail.modal.html',
})
export class CurrentTodoDetailModal {
    private readonly CLASS_NAME = 'CurrentTodoDetailModal';

    public todoForm: FormGroup;

    private dataModel: Todo =
    {
        id: undefined,
        description: null,
        name: '',
        index: 0,
        isComplete: false,
        userId: undefined,
    };

    private isEditing: boolean;

    constructor(
        public formBuilder: FormBuilder,
        params: NavParams,
        public viewController: ViewController
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);

        if (params.get('isEdited')) {
            this.isEditing = true;
            this.dataModel = params.get('data');
        } else {
            this.isEditing = false;
        }

        console.log('isEditing>', this.isEditing);
        this.createForm();
    }

    private createForm(): void {
        this.todoForm = this.formBuilder.group({
            nameA: [this.dataModel.name, Validators.required],
            description: [this.dataModel.description],
            isComplete: [this.dataModel.isComplete]
        });
    }

    dismiss() {
        console.log('dismiss');
        this.viewController.dismiss();
    }

    save() {
        console.log('TodoModalPage:save');
        console.log('TodoModalPage:todoForm>', this.todoForm);

        if (!this.todoForm.valid) {
            return;
        }
        /*
            if (this.userForm.dirty && this.userForm.valid) {
              alert(`Name: ${this.userForm.value.name} Email: ${this.userForm.value.email}`);
            }
        */

        // if(this.todoForm.touched)
        console.log(this.todoForm.value);
        console.log('this.formResult>', this.dataModel);
        // this.formResult.description = this.todoForm.value.description;
        // this.formResult.isComplete = this.todoForm.value.isComplete;
        // this.formResult.name = this.todoForm.value.nameA;
        this.dataModel = this.prepareSaveData();

        this.viewController.dismiss(this.dataModel);
    }

    private prepareSaveData(): Todo {
        const formModel = this.todoForm.value;

        const saveData: Todo = {
            description: formModel.description,
            id: this.dataModel.id,
            index: this.dataModel.index,
            isComplete: formModel.isComplete,
            name: formModel.nameA,
            userId: this.dataModel.userId,
        };

        return saveData;
    }
}
