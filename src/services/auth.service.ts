import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


//import { Auth, User, IDetailedError } from '@ionic/cloud-angular';

import { ActiveUser } from '../models/active-user';
import { CurrentUser } from '../models/current-user';

import firebase from 'firebase';

// Original: https://github.com/aaronksaunders/Ionic2-Ionic.io-Auth-Example

@Injectable()
export class AuthService {
    private readonly CLASS_NAME = 'AuthService';
    //
    // this will hold the user object when we have one, we can subscribe
    // to changes of this object to determine of we are logged in or not
    activeUser = new BehaviorSubject<ActiveUser>(null)

    currentUser$ = new BehaviorSubject<CurrentUser>(null)

    constructor(
    ) {
        console.log(`%s:constructor`, this.CLASS_NAME);
        firebase.auth().onAuthStateChanged((user: firebase.User) => {
            if (user) {
                // User is signed in.
                console.log(`%s:User is signed in>`, this.CLASS_NAME, user.uid);
                this.currentUser$.next(this.createCurrentUser(user));

            } else {
                // No user is signed in.
                console.log('No user is signed in.');
                this.currentUser$.next(null);
            }
        });
    }

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
    doLogin(_username, _password?) {
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

            let details = { 'email': _username, 'password': _password };
            /*
                        this.auth.login('basic', details).then((_result) => {
            
                            let authUser: ActiveUser = {
                                id: this.user.id,
                                email: this.user.details.email,
                                image: this.user.details.image,
                                name: this.user.details.name,
                                userName: this.user.details.username
                            };
            
                            this.activeUser.next(authUser);
                            // this.activeUser.next(Object.assign({}, this.user.details, { id: this.user.id }))
                        }, (err) => {
                            // Gives POST https://api.ionic.io/auth/login 401 ()
                            // Error: Unsuccessful HTTP response
                            console.log('AAAAA>', err)
                        });
            */
        }
    }

    /**
     * create the user with the information and set the user object
     */
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
        */
    }

    doSignup(_email, _password?) {
        console.log('%s:doSignup()', this.CLASS_NAME)
        if (_email.length) {
            let details = { 'email': _email, 'password': _password };
            /*
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
        // this.auth.logout();
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }, (error) => {
            // this.error = error
            console.log(error);
        });
        this.activeUser.next(null)
    }
}
