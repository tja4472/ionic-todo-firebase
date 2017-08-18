import { Component } from '@angular/core';

import {
  Events,
  ModalController,
  NavController,
  PopoverController,
} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { CurrentTodoService } from '../../services/current-todo.service';

import { IReorderArrayIndexes } from '../../models/reorder-array-indexes';
import { ITodo } from '../../models/todo.model';

import {
  CurrentTodoDetailModal,
  ICurrentTodoDetailModalParam
} from '../current-todo-detail-modal/current-todo-detail.modal';
import {
  CurrentTodosPopover,
  ICurrentTodosPopoverResult
} from '../../components/current-todos-popover/current-todos.popover';

@Component({
  selector: 'page-current-todos',
  templateUrl: 'current-todos.page.html'
})
export class CurrentTodosPage {
  todos$: Observable<ITodo[]>;

  private readonly CLASS_NAME = 'CurrentTodosPage';

  constructor(
    public events: Events,
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
    const params: ICurrentTodoDetailModalParam = { isEdited: false };
    const modal = this.modalCtrl.create(CurrentTodoDetailModal, params);

    modal.onDidDismiss((data: ITodo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.saveItem(data);
      }
    });

    modal.present();
  }

  toggleCompleteItem(item: ITodo) {
    console.log('completeItem:item>', item);
    this.todoService.toggleCompleteItem(item);
  }

  editItem(item: ITodo) {
    console.log('editItem:item>', item);
    // let todo: ToDo;
    // todo = assign(todo, item);

    const params: ICurrentTodoDetailModalParam = { data: item, isEdited: true };
    const modal = this.modalCtrl.create(CurrentTodoDetailModal, params);

    modal.onDidDismiss((data: ITodo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.saveItem(data);
      }
    });

    modal.present();
  }

  presentPopover(event: Event) {
    const popover = this.popoverCtrl.create(CurrentTodosPopover);

    popover.onDidDismiss((result: ICurrentTodosPopoverResult) => {
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

  reorderItems(indexes: IReorderArrayIndexes) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }

  removeItem(item: ITodo) {
    console.log('CurrentTodosPage:removeItem:item>', item);
    this.todoService.removeItem(item);
  }

  ionViewCanEnter(): boolean {
    console.log('CurrentTodosPage:ionViewCanEnter');
    // Check if logged in.
    return true;
    // return false;
  }

  ionViewDidLeave() {
    console.log('CurrentTodosPage:ionViewDidLeave');
  }

  ionViewDidLoad() {
    console.log('CurrentTodosPage:ionViewDidLoad');
    this.events.publish('app:boot', Date.now());
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
