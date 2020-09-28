import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Course } from "app/model/course";

import * as firebase from "firebase/app";
import "firebase/firestore";
// import { firestore } from  'firebase'
import { environment } from "../../environments/environment";

firebase.initializeApp(environment.firebaseConfig);

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
