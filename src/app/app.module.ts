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
import { CurrentTodoDetailModal } from '../pages/current-todo-detail/current-todo-detail.modal';
import { CurrentTodosPage } from '../pages/current-todos/current-todos.page';

import { CompletedTodoListComponent } from '../components/completed-todo-list/completed-todo-list.component';
import { CurrentTodoListComponent } from '../components/current-todo-list/current-todo-list.component';
import { MyPopoverPage } from '../components/popover/popover.component';


import { CompletedTodoService } from '../services/completed-todo.service';
import { CompletedTodoServiceLive } from '../services/completed-todo-live.service';
// import { CompletedTodoServiceMock } from '../services/completed-todo-mock.service';

import { CurrentTodoService } from '../services/current-todo.service';
import { CurrentTodoServiceLive } from '../services/current-todo-live.service';
// import { CurrentTodoServiceMock } from '../services/current-todo-mock.service';

import { DM_CompletedTodoService } from '../services/dm-completed-todo.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import firebase from 'firebase';


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
    MyPopoverPage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
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
    MyPopoverPage,
    SignupPage,
  ],
  providers: [
    AuthService,
    { provide: CompletedTodoService, useClass: CompletedTodoServiceLive },
    { provide: CurrentTodoService, useClass: CurrentTodoServiceLive },    
    DM_CompletedTodoService,
    ValidationService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {

  constructor() {
    firebase.initializeApp(MyFirebaseAppConfig);
  }
}
