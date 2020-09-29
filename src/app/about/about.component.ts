import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Course } from "app/model/course";
import { of } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit() {}
}

// Angular Advanced Library Laboratory: Build Your Own Library
// Angular Security Course - Web Security Fundamentals

// Angular Security
// Make Libs

// /courses/dnu3hkjJoUA3GbhPWv5F -> Serverless Angular
// /courses/cYg5PdC7A0VEGvWhbkgp -> Angular for beginers

// save() {}

// async runTransaction() {}
