import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ITodo } from '../../models/todo.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export interface ICurrentTodoDetailModalParam {
    data?: ITodo;
    isEdited: boolean;
}

@Component({
    selector: 'modal-current-todo-detail',
    templateUrl: 'current-todo-detail.modal.html',
})
export class CurrentTodoDetailModal {
    public todoForm: FormGroup;

    private dataModel: ITodo =
    {
        $key: undefined,
        description: undefined,
        index: 0,
        isComplete: false,
        name: '',
        userId: '',
    };

    private isEditing: boolean;

    private readonly CLASS_NAME = 'CurrentTodoDetailModal';

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

    private createForm(): void {
        this.todoForm = this.formBuilder.group({
            description: [this.dataModel.description],
            isComplete: [this.dataModel.isComplete],
            nameA: [this.dataModel.name, Validators.required],
        });
    }

    private prepareSaveData(): ITodo {
        const formModel = this.todoForm.value;

        const saveData: ITodo = {
            $key: this.dataModel.$key,
            description: formModel.description,
            index: this.dataModel.index,
            isComplete: formModel.isComplete,
            name: formModel.nameA,
            userId: this.dataModel.userId,
        };

        return saveData;
    }
}
