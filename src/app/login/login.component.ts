import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const uiConfig: firebaseui.auth.Config = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccess.bind(this),
      },
    };

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

    this.ui.start("#firebaseui-auth-container", uiConfig);
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSuccess(result) {
    console.log("Firebase UI result: ", result);
    this.router.navigateByUrl("/courses");
    this.ngZone.run(() => this.router.navigateByUrl("/courses"));
  }
}
