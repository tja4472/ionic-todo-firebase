import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
// import { TodoService } from '../../services/todo.service';

import { ITodoCompleted } from '../../models/todo-completed';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { ControlMessages } from '../../components/control-messages/control-messages.component';

export interface IModalResult {
  isRemoved: boolean;
  isCancelled: boolean;
  todo?: ITodoCompleted;
}

@Component({
  selector: 'page-completed-todo-detail',
  templateUrl: 'completed-todo-detail.page.html'
})
export class CompletedTodoDetailPage {
  public todoForm: FormGroup;

  private readonly CLASS_NAME = 'CompletedTodoDetailPage';

  // data model.
  private todo: ITodoCompleted =
  {
    description: undefined,
    id: undefined,
    isComplete: false,
    name: '',
    userId: '',
  };

  private isEditing: boolean;

  constructor(
    private formBuilder: FormBuilder,
    params: NavParams,
    public viewController: ViewController
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    console.log('params:get>', params.get('todo'));

    const paramTodo: ITodoCompleted = params.get('todo');
    this.isEditing = !!paramTodo;

    if (this.isEditing) {
      this.todo = paramTodo;
    }

    this.createForm();
  }



  dismiss() {
    console.log('dismiss');
    const modalResult: IModalResult = {
      isCancelled: true,
      isRemoved: false,
    };
    this.viewController.dismiss(modalResult);
  }

  remove() {
    console.log('remove');
    const modalResult: IModalResult = {
      isCancelled: false,
      isRemoved: true,
      todo: this.todo,
    };
    this.viewController.dismiss(modalResult);
  }

  save() {
    console.log('save');

    if (!this.todoForm.valid) {
      return;
    }

    console.log('this.todoForm.value>', this.todoForm.value);
    console.log('this.todoForm.status>', this.todoForm.status);

    this.todo = this.prepareSaveData();
    // console.log('localTodo>', this.todo);

    const modalResult: IModalResult = {
      isCancelled: false,
      isRemoved: false,
      todo: this.todo,
    };

    this.viewController.dismiss(modalResult);
  }

  private createForm(): void {
    this.todoForm = this.formBuilder.group({
      description: [this.todo.description],
      isComplete: [this.todo.isComplete],
      name: [this.todo.name, Validators.required],
    });
  }

  private prepareSaveData(): ITodoCompleted {
    const formModel = this.todoForm.value;

    const saveData: ITodoCompleted = {
      description: formModel.description,
      id: this.todo.id,
      isComplete: formModel.isComplete,
      name: formModel.name,
      userId: this.todo.userId,
    };

    return saveData;
  }
}
