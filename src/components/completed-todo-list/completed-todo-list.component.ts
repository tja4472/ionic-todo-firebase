import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoCompleted } from '../../models/todo-completed';

@Component({
  selector: 'completed-todo-list',
  templateUrl: 'completed-todo-list.component.html',
})
export class CompletedTodoListComponent {
  @Input() public data: ITodoCompleted[];

  @Output() public editItem = new EventEmitter<ITodoCompleted>();
  @Output() public toggleCompleteItem = new EventEmitter<ITodoCompleted>();

  private readonly CLASS_NAME = 'CompletedTodoListComponent';

  constructor(
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }
}
