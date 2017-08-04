import { ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { CurrentUser } from '../models/current-user';

import * as firebase from 'firebase/app';

// Original: https://github.com/aaronksaunders/Ionic2-Ionic.io-Auth-Example

@Injectable()
export class AuthService {
    private readonly CLASS_NAME = 'AuthService';
    //
    // this will hold the user object when we have one, we can subscribe
    // to changes of this object to determine of we are logged in or not
    // activeUser = new BehaviorSubject<ActiveUser>(null)

    public replaySubject$: ReplaySubject<CurrentUser | null> = new ReplaySubject<CurrentUser>(1);

    private _authUserBehaviorSubject$ = new BehaviorSubject<CurrentUser | null>({ id: null, email: null });

    private _authStateChecked: boolean = false;

    get authUser() {
        return this._authUserBehaviorSubject$.getValue();
    }

    get authStateChecked() {
        return this._authStateChecked;
    }

    get authUser$() {
        return this._authUserBehaviorSubject$.asObservable();
    }


    constructor(
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);

        firebase.auth().onAuthStateChanged((user: firebase.User) => {
            this._authStateChecked = true;

            if (user) {
                // User is signed in.
                console.log(`%s:User is signed in>`, this.CLASS_NAME, user.uid);
                this._authUserBehaviorSubject$.next(this.createCurrentUser(user));
this.replaySubject$.next(this.createCurrentUser(user));
            } else {
                // No user is signed in.
                console.log(`%s: No user is signed in.`, this.CLASS_NAME);
                // this._authUserBehaviorSubject$.next({ id: null, email: null });
                // this.replaySubject$.next({ id: null, email: null });
                this._authUserBehaviorSubject$.next(null);
                this.replaySubject$.next(null);  
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
    createCurrentUser(
        user: firebase.User
    ): CurrentUser {
        let currentUser: CurrentUser = {
            email: user.email,
            id: user.uid,
        }

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
        _username: string,
        _password: string
    ) {
        console.log('%s:doLogin()', this.CLASS_NAME);
        if (_username.length) {
            firebase.auth().signInWithEmailAndPassword(_username, _password)
                .catch(error => {
                    // Handle Errors here.
                    console.log('error>', error)
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
    doSignup(
        _email: string, 
        _password?: string) {
        console.log('%s:doSignup()', this.CLASS_NAME)
        if (_email.length) {
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

        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }, (error) => {
            // this.error = error
            console.log(error);
        });
       // this._authUserBehaviorSubject$.next(null)
    }
}
