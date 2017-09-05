import { ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ICurrentUser } from '../models/current-user';

import * as firebase from 'firebase/app';

// Original: https://github.com/aaronksaunders/Ionic2-Ionic.io-Auth-Example

@Injectable()
export class AuthService {
    public error$ = new ReplaySubject<Error | null>(1);

    public notifier$: ReplaySubject<ICurrentUser | null> = new ReplaySubject<ICurrentUser>(1);
    private readonly CLASS_NAME = 'AuthService';
    //
    // this will hold the user object when we have one, we can subscribe
    // to changes of this object to determine of we are logged in or not
    // activeUser = new BehaviorSubject<ActiveUser>(null)



    // tslint:disable-next-line:variable-name
    private _authUserBehaviorSubject$ = new BehaviorSubject<ICurrentUser | null>({ id: null, email: null });

    // private _authStateChecked: boolean = false;

    get authUser() {
        return this._authUserBehaviorSubject$.getValue();
    }

    /*
        get authStateChecked() {
            return this._authStateChecked;
        }
    */
    constructor(
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);
        this.clearError$();

        firebase.auth().onAuthStateChanged((user: firebase.User) => {
            // this._authStateChecked = true;

            if (user) {
                // User is signed in.
                console.log(`%s:User is signed in>`, this.CLASS_NAME, user.uid);
                this._authUserBehaviorSubject$.next(this.createCurrentUser(user));
                this.notifier$.next(this.createCurrentUser(user));
            } else {
                // No user is signed in.
                console.log(`%s: No user is signed in.`, this.CLASS_NAME);
                // this._authUserBehaviorSubject$.next({ id: null, email: null });
                // this.replaySubject$.next({ id: null, email: null });
                this._authUserBehaviorSubject$.next(null);
                this.notifier$.next(null);
            }
        });
    }
    /*
        init() {
            firebase.auth().onAuthStateChanged((user: firebase.User) => {
                this.stateChecked = true;

                if (user) {
                    // User is signed in.
                    console.log(`%s:User is signed in>`, this.CLASS_NAME, user.uid);
                    this.currentUser$.next(this.createCurrentUser(user));

                } else {
                    // No user is signed in.
                    console.log(`%s: No user is signed in.`, this.CLASS_NAME);
                    this.currentUser$.next(null);
                }
            });
        }
    */
    public clearError$() {
        this.error$.next(null);
    }

    createCurrentUser(
        user: firebase.User
    ): ICurrentUser {
        const currentUser: ICurrentUser = {
            email: user.email,
            id: user.uid,
        };

        return currentUser;
    }
    /**
     * here we check to see if ionic saved a user for us
     */
    doCheckAuth() {
        console.log('%s:doCheckAuth()', this.CLASS_NAME);
        /*
                if (this.auth.isAuthenticated()) {
                    let authUser: ActiveUser = {
                        id: this.user.id,
                        email: this.user.details.email,
                        image: this.user.details.image,
                        name: this.user.details.name,
                        userName: this.user.details.username
                    };

                    this.activeUser.next(authUser);
                }
        */
    }

    /**
     * login using a username and password
     */
    doLogin(
        username: string,
        password: string
    ) {
        console.log('%s:doLogin()', this.CLASS_NAME);
        if (username.length) {
            firebase.auth().signInWithEmailAndPassword(username, password)
                .catch((error) => {
                    // Handle Errors here.
                    console.log('error>', error);
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // ...
                });
        }
    }

    /**
     * create the user with the information and set the user object
     */
    /*
        doCreateUser(_params) {
            console.log('%s:doCreateUser()', this.CLASS_NAME);
            /*
                    this.auth.signup({ email: _params.email, password: _params.password, username: _params.username })
                        .then(() => {
                            return this.doLogin(_params.email, _params.password);
                        }, (err: IDetailedError<string[]>) => {
                            console.log(err)
                            for (let e of err.details) {
                                if (e === 'conflict_email') {
                                    alert('Email already exists.');
                                } else {
                                    // handle other errors
                                }
                            }
                        });
            * /
        }
    */
    public createUserWithEmailAndPassword(
        email: string,
        password: string) {
        console.log('###%s:createUserWithEmailAndPassword', this.CLASS_NAME);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                // Handle Errors here.
                /*
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                if (errorCode == 'auth/weak-password') {
                                    alert('The password is too weak.');
                                } else {
                                    alert(errorMessage);
                                }
                */
                console.log('error>', error);
                this.error$.next(error);
            });
    }

    doSignup(
        email: string,
        _password?: string) {
        console.log('%s:doSignup()', this.CLASS_NAME);
        if (email.length) {
            // firebase.auth().createUserWithEmailAndPassword
            /*
             let details = { 'email': _email, 'password': _password };

                         this.auth.signup(details)
                             .then(() => {
                                 return this.doLogin(_email, _password);
                             }, (err: IDetailedError<string[]>) => {
                                 console.log(err)
                                 for (let e of err.details) {
                                     if (e === 'conflict_email') {
                                         alert('Email already exists.');
                                     } else {
                                         // handle other errors
                                     }
                                 }
                             });
             */
        }
    }

    /**
     * logout and remove the user...
     */
    doLogout() {
        console.log('%s:doLogout()', this.CLASS_NAME);

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }, (error) => {
            // this.error = error
            console.log(error);
        });
        // this._authUserBehaviorSubject$.next(null)
    }
}
