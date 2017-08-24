import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home.page';

// auth module?
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';
import { AuthService } from '../services/auth.service';
// ---
import { TodoCompletedDetailModal } from '../modals/todo-completed-detail/todo-completed-detail.modal';
import { TodoDetailModal } from '../modals/todo-detail/todo-detail.modal';

import { TodoCompletedListPage } from '../pages/todo-completed-list/todo-completed-list.page';
import { TodoListPage } from '../pages/todo-list/todo-list.page';

import { TodoListPopover } from '../components/todo-list-popover/todo-list.popover';

// shared
import { CurrentTodoDetailsComponent } from '../shared/components/current-todo-details/current-todo-details.component';
import { ControlMessagesComponent } from '../shared/components/control-messages/control-messages.component';
import { CurrentTodoListComponent } from '../shared/components/current-todo-list/current-todo-list.component';
import { TodoCompletedListComponent } from '../shared/components/todo-completed-list/todo-completed-list.component';
import { ValidationService } from '../shared/services/validation.service';

import { CompletedTodoService } from '../services/completed-todo.service';
import { CompletedTodoServiceLive } from '../services/completed-todo-live.service';
// import { CompletedTodoServiceMock } from '../services/completed-todo-mock.service';

import { CurrentTodoService } from '../services/current-todo.service';
import { CurrentTodoServiceLive } from '../services/current-todo-live.service';
// import { CurrentTodoServiceMock } from '../services/current-todo-mock.service';

import { DmCompletedTodoService } from '../services/dm-completed-todo.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MY_FIREBASE_APP_CONFIG } from './my-firebase-app-config';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    Page1,
    Page2,
    TodoCompletedDetailModal,
    TodoCompletedListComponent,
    TodoCompletedListPage,
    ControlMessagesComponent,
    TodoDetailModal,
    CurrentTodoDetailsComponent,
    CurrentTodoListComponent,
    TodoListPage,
    LoginPage,
    TodoListPopover,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  // tslint:disable-next-line:object-literal-sort-keys
  bootstrap: [IonicApp],
  entryComponents: [
    TodoCompletedDetailModal,
    TodoCompletedListPage,
    TodoDetailModal,
    TodoListPage,
    HomePage,
    MyApp,
    Page1,
    Page2,
    LoginPage,
    TodoListPopover,
    SignupPage,
  ],
  providers: [
    AuthService,
    { provide: CompletedTodoService, useClass: CompletedTodoServiceLive },
    { provide: CurrentTodoService, useClass: CurrentTodoServiceLive },
    DmCompletedTodoService,
    ValidationService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {

  constructor() {
    firebase.initializeApp(MY_FIREBASE_APP_CONFIG);
  }
}
