import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Course } from "app/model/course";

import * as firebase from "firebase/app";
import "firebase/firestore";
// import { firestore } from  'firebase'

const config = {
  apiKey: "AIzaSyCPL_TTVytKOsPx1JNjk2gYKABQKjiwzvQ",
  authDomain: "fire-course-app.firebaseapp.com",
  databaseURL: "https://fire-course-app.firebaseio.com",
  projectId: "fire-course-app",
  storageBucket: "fire-course-app.appspot.com",
  messagingSenderId: "746854701396",
  appId: "1:746854701396:web:917a64184758b6fc5890c1",
  measurementId: "G-9KCPSTL7NW",
};
firebase.initializeApp(config);

const db = firebase.firestore();

// const settings = { timestampsInSnapshots: true };
// db.settings(settings);

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // db.doc("courses/R8mq7RDDirwcO6tg1Dt0")
    //   .get()
    //   .then((snap) => console.log(snap.data()));

    // db.doc("/courses/R8mq7RDDirwcO6tg1Dt0/lessons/5e6fp67m9haBhoF3oLWu")
    //   .get()
    //   .then((snap) => console.log(snap.data()));

    db.collection("courses")
      .get()
      .then((snaps) => {
        // console.log(snaps);
        const courses = snaps.docs.map((snap) => {
          const course = <Course>{ id: snap.id, ...snap.data() };
          return course;
        });
        console.log(courses);
      });
  }
}
