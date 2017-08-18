import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home.page';

// auth module?
import { ControlMessages } from '../components/control-messages/control-messages.component';
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';
// ---
import { CompletedTodoDetailPage } from '../pages/completed-todo-detail/completed-todo-detail.page';
import { CompletedTodosPage } from '../pages/completed-todos/completed-todos.page';
import { CurrentTodoDetailModal } from '../pages/current-todo-detail-modal/current-todo-detail.modal';
import { CurrentTodosPage } from '../pages/current-todos/current-todos.page';

import { CompletedTodoListComponent } from '../components/completed-todo-list/completed-todo-list.component';
import { CurrentTodoListComponent } from '../shared/components/current-todo-list/current-todo-list.component';
import { CurrentTodosPopover } from '../components/current-todos-popover/current-todos.popover';


import { CompletedTodoService } from '../services/completed-todo.service';
import { CompletedTodoServiceLive } from '../services/completed-todo-live.service';
// import { CompletedTodoServiceMock } from '../services/completed-todo-mock.service';

import { CurrentTodoService } from '../services/current-todo.service';
import { CurrentTodoServiceLive } from '../services/current-todo-live.service';
// import { CurrentTodoServiceMock } from '../services/current-todo-mock.service';

import { DmCompletedTodoService } from '../services/dm-completed-todo.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MY_FRIREBASE_APP_CONFIG } from './my-firebase-app-config';

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
    CompletedTodoDetailPage,
    CompletedTodoListComponent,
    CompletedTodosPage,
    ControlMessages,
    CurrentTodoDetailModal,
    CurrentTodoListComponent,
    CurrentTodosPage,
    LoginPage,
    CurrentTodosPopover,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  // tslint:disable-next-line:object-literal-sort-keys
  bootstrap: [IonicApp],
  entryComponents: [
    CompletedTodoDetailPage,
    CompletedTodosPage,
    CurrentTodoDetailModal,
    CurrentTodosPage,
    HomePage,
    MyApp,
    Page1,
    Page2,
    LoginPage,
    CurrentTodosPopover,
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
    firebase.initializeApp(MY_FRIREBASE_APP_CONFIG);
  }
}
