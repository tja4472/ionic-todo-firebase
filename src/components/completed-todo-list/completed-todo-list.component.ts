import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoCompleted } from '../../shared/models/todo-completed.model';

@Component({
  selector: 'completed-todo-list',
  templateUrl: 'completed-todo-list.component.html',
})
export class CompletedTodoListComponent {
  @Input() public data: TodoCompleted[];

  @Output() public editItem = new EventEmitter<TodoCompleted>();
  @Output() public toggleCompleteItem = new EventEmitter<TodoCompleted>();

  private readonly CLASS_NAME = 'CompletedTodoListComponent';

  constructor(
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }
}
