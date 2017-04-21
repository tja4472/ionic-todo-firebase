import { Component } from '@angular/core';

import {
  ModalController,
  NavController,
  PopoverController,
} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { CurrentTodoService } from '../../services/current-todo.service';

import { ReorderArrayIndexes } from '../../models/reorder-array-indexes';
import { Todo } from '../../models/todo';

import { CurrentTodoDetailModal } from '../current-todo-detail/current-todo-detail.modal';
import { CurrentTodosPopover, CurrentTodosPopoverResult } from '../../components/current-todos-popover/current-todos.popover';

@Component({
  selector: 'page-current-todos',
  templateUrl: 'current-todos.page.html'
})
export class CurrentTodosPage {
  private readonly CLASS_NAME = 'CurrentTodosPage';
  todos$: Observable<Todo[]>;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    private todoService: CurrentTodoService,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    this.todos$ = this.todoService.data$;
  }

  createItem() {
    console.log('createItem');
    let modal = this.modalCtrl.create(CurrentTodoDetailModal);

    modal.onDidDismiss((data: Todo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.saveItem(data);
      }
    });

    modal.present()
  }

  toggleCompleteItem(item: Todo) {
    console.log('completeItem:item>', item);
    this.todoService.toggleCompleteItem(item);
  }

  editItem(item: Todo) {
    console.log('editItem:item>', item);
    // let todo: ToDo;
    // todo = assign(todo, item);


    let modal = this.modalCtrl.create(CurrentTodoDetailModal, { todo: item });

    modal.onDidDismiss((data: Todo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.saveItem(data);
      }
    });

    modal.present();
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(CurrentTodosPopover);

    popover.onDidDismiss((result: CurrentTodosPopoverResult) => {
      console.log('popover.onDidDismiss>', result);

      if (!!!result) {
        // no result.
        console.log('result is null.');
        return;
      }

      console.log('result.clearCompleted>', result.clearCompleted);
      if (result.clearCompleted) {
        this.todoService.clearCompletedItems();
        return;
      }
    });

    popover.present({
      ev: event
    });
  }

  reorderItems(indexes: ReorderArrayIndexes) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }

  removeItem(item: Todo) {
    console.log('CurrentTodosPage:removeItem:item>', item);
    this.todoService.removeItem(item);
  }

  ionViewDidLeave() {
    console.log('CurrentTodosPage:ionViewDidLeave');
  }
}   

/*    
        this.todos =
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

            this.todos$ = Observable.of(this.todos);     
*/            
