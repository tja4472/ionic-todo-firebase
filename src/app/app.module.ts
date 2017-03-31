import { NgModule, ErrorHandler } from '@angular/core';
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
    ControlMessages,
    LoginPage,
    SignupPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    Page1,
    Page2,
    LoginPage,
    SignupPage,
  ],
  providers: [
    AuthService,
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
