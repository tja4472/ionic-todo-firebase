import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CurrentUser } from '../models/current-user';
import { CompletedTodosPage } from '../pages/completed-todos/completed-todos.page';
import { CurrentTodosPage } from '../pages/current-todos/current-todos.page';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SignupPage } from '../pages/signup/signup.page';
import { AuthService } from '../services/auth.service';
import { CompletedTodoService } from '../services/completed-todo.service';
import { CurrentTodoService } from '../services/current-todo.service';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  private readonly CLASS_NAME = 'MyApp';

  @ViewChild(Nav) nav: Nav;

  public displayUserName: string;
  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Home Page', component: HomePage, icon: 'calendar' },
    { title: 'Page One', component: Page1, icon: 'calendar' },
    { title: 'Page Two', component: Page2, icon: 'calendar' },
  ];

  loggedInPages: PageInterface[] = [
    { title: 'Current Todos Page', component: CurrentTodosPage, icon: 'calendar' },
    { title: 'Completed Todos Page', component: CompletedTodosPage, icon: 'calendar' },
    { title: 'Logout', component: Page1, icon: 'log-out', logsOut: true }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, icon: 'log-in' },
  ]
  rootPage: any; // = Page1;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public events: Events,
    public menu: MenuController,
    // private ngZone: NgZone,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthService,
    private completedTodoService: CompletedTodoService,
    private currentTodoService: CurrentTodoService,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    this.initializeApp();
  }

  ngOnInit() {
    console.log(`%s:ngOnInit`, this.CLASS_NAME);
    // check login state.
    //  firebase.auth().onAuthStateChanged((_currentUser) => {
    // this.authService.init();
  }

  initializeApp() {
    console.log(`%s:initializeApp`, this.CLASS_NAME);
    let bootTime = Date.now();

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(`%s:platform.ready()`, this.CLASS_NAME);
      let readyTime = Date.now();
      this.events.subscribe('app:boot', (time: number) => {
        console.log('App boot start: ', bootTime);
        console.log('App boot ready: ', readyTime);
        console.log('App boot done: ', time);
        console.log('Diff boot', time - bootTime);
        console.log('Diff ready', time - readyTime);
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // This has to be done after platform.ready() else enableMenu() will
      // not change menu.
      this.setupAuthServiceSubscription();
    });
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    // this.rootPage = page.component;
    // console.log('NgZone.isInAngularZone()-2>', NgZone.isInAngularZone());
    this.nav.setRoot(page.component).catch(() => {
      console.error('openPage:Didn\'t set nav root.');
    });

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.authService.doLogout()
      }, 1000);
    }
  }

  private setupAuthServiceSubscription() {
    // NgZone.isInAngularZone() = true
    // console.log('NgZone.isInAngularZone()-1>', NgZone.isInAngularZone());
    this.authService.authUser$
      .subscribe((currentUser: CurrentUser) => {
        console.log(`%s: -- authService.activeUser subscribe --`, this.CLASS_NAME);
        console.log(`%s:currentUser>`, this.CLASS_NAME, currentUser);
        console.log(`%s:stateChecked>`, this.CLASS_NAME, this.authService.authStateChecked);

        if (!this.authService.authStateChecked) {
          return;
        }

        // NgZone.isInAngularZone() = false
        // console.log('NgZone.isInAngularZone()-2>', NgZone.isInAngularZone());

        // Without the ngZone the [disabled]="!loginForm.valid" was being ignored
        // in login.page.html.
        // this.ngZone.run(() => {
        // NgZone.isInAngularZone() = true
        // console.log('NgZone.isInAngularZone()-3>', NgZone.isInAngularZone());
        if (currentUser) {
          console.log(`%s: -- logged in --`, this.CLASS_NAME);

          if (currentUser.email === null) {
            this.displayUserName = '';
          } else {
            this.displayUserName = currentUser.email;
          }

          this.enableMenu(true);
          this.nav.setRoot(CurrentTodosPage).catch(() => {
            console.error("Didn't set nav root");
          });

          this.currentTodoService.startListening();
          this.completedTodoService.startListening();
        } else {
          console.log(`%s: -- logged out --`, this.CLASS_NAME);
          this.displayUserName = 'Not logged in';
          this.enableMenu(false);
          this.nav.setRoot(HomePage).catch(() => {
            console.error("Didn't set nav root");
          });
          console.log(`%s: -- logged out 1--`, this.CLASS_NAME);
          this.currentTodoService.stopListening();
          console.log(`%s: -- logged out 2--`, this.CLASS_NAME);
          this.completedTodoService.stopListening();
          console.log(`%s: -- logged out 3 --`, this.CLASS_NAME);
        }
      });
    // });
  }

  enableMenu(loggedIn: boolean): void {
    const loggedInMenu = 'loggedInMenu';
    const loggedOutMenu = 'loggedOutMenu';

    if (!this.menu.get(loggedInMenu)) {
      console.error(`%s:enableMenu() *** WARNING: Menu not found>`, this.CLASS_NAME, loggedInMenu);
    }

    if (!this.menu.get(loggedOutMenu)) {
      console.error(`%s:enableMenu() *** WARNING: Menu not found>`, this.CLASS_NAME, loggedOutMenu);
    }

    this.menu.enable(loggedIn, loggedInMenu);
    this.menu.enable(!loggedIn, loggedOutMenu);
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }
}
