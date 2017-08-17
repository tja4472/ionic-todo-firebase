import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ReorderArrayIndexes } from '../../models/reorder-array-indexes';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'current-todo-list',
  templateUrl: 'current-todo-list.component.html',
})
export class CurrentTodoListComponent {
  private readonly CLASS_NAME = 'CurrentTodoListComponent';

  @Input() public todos: ITodo[];
  @Output() public addItem = new EventEmitter();
  @Output() public toggleCompleteItem = new EventEmitter<ITodo>();
  @Output() public editItem = new EventEmitter<ITodo>();
  @Output() public reorderItems = new EventEmitter<ReorderArrayIndexes>();
  @Output() public removeItem = new EventEmitter<ITodo>();

  constructor(
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
  }
}
