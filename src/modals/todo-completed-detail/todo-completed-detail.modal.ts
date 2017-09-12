import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
// import { TodoService } from '../../services/todo.service';

import { TodoCompleted } from '../../shared/models/todo-completed.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { ControlMessages } from '../../components/control-messages/control-messages.component';

export interface IModalResult {
  isRemoved: boolean;
  isCancelled: boolean;
  todo?: TodoCompleted;
}

@Component({
  selector: 'tja-modal-todo-completed-detail',
  templateUrl: 'todo-completed-detail.modal.html'
})
export class TodoCompletedDetailModal {
  public todoForm: FormGroup;

  private readonly CLASS_NAME = 'TodoCompletedDetailModal';

  // data model.
  private todo: TodoCompleted = new TodoCompleted();
/*
  {
    description: undefined,
    id: undefined,
    isComplete: false,
    name: '',
    userId: '',
  };
*/
  private isEditing: boolean;

  constructor(
    private formBuilder: FormBuilder,
    navParams: NavParams,
    public viewController: ViewController
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    // navParams passes by reference.
    const navParamsTodo: Readonly<TodoCompleted> = Object.assign(new TodoCompleted(), navParams.get('todo'));

    // console.log('params:get>', navParams.get('todo'));
    // const navParamsTodo: TodoCompleted = navParams.get('todo');

    this.isEditing = !!navParamsTodo;

    if (this.isEditing) {
      this.todo = navParamsTodo;
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

  private prepareSaveData(): TodoCompleted {
    const formModel = this.todoForm.value;

    const saveData: TodoCompleted = new TodoCompleted();
    saveData.description = formModel.description;
    saveData.$key = this.todo.$key;
    saveData.name = formModel.name;
    saveData.userId = this.todo.userId;
/*
    const saveData: TodoCompleted = {
      description: formModel.description,
      id: this.todo.id,
      isComplete: formModel.isComplete,
      name: formModel.name,
      userId: this.todo.userId,
    };
*/
    return saveData;
  }
}
