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

  ngOnInit() {
    // const courseRef =  this.db.doc('/courses/cYg5PdC7A0VEGvWhbkgp')
    const courseRef = this.db
      .doc("/courses/dnu3hkjJoUA3GbhPWv5F")
      .snapshotChanges()
      .subscribe((snap) => {
        const course: any = snap.payload.data();

        console.log("course.relatedCourseRef ", course.relatedCourseRef);
      });

    const ref = this.db
      .doc("/courses/cYg5PdC7A0VEGvWhbkgp")
      .snapshotChanges()
      .subscribe((doc) => console.log("ref", doc.payload.ref));
  }

  save() {
    const securityCourseRef = this.db.doc("/courses/R8mq7RDDirwcO6tg1Dt0").ref;
    const libCourseRef = this.db.doc("/courses/ppI5qn6H9SAWKTusRwL1").ref;

    const batch = this.db.firestore.batch(); // nova instância de um batch

    batch.update(securityCourseRef, {
      titles: {
        description: "Angular Security Course - Web Security Fundamentals",
      },
    });
    batch.update(libCourseRef, {
      titles: {
        description:
          "Angular Advanced Library Laboratory: Build Your Own Library",
      },
    });

    const batch$ = of(batch.commit());

    batch$.subscribe();
  }

  async runTransaction() {
    const newCounter = await this.db.firestore.runTransaction(
      async (transaction) => {
        console.log("running transaction ...");

        const materialCourseRef = this.db.doc("/courses/CyX3NOhG61gZX41fMA0O")
          .ref;

        const snap = await transaction.get(materialCourseRef); // provê read-lock

        const course = <Course>snap.data();

        const lessonsCount = course.lessonsCount + 1;

        transaction.update(materialCourseRef, { lessonsCount });

        return lessonsCount;
      }
    );
    console.log("result lessons count = " + newCounter);
  }
}

// Angular Advanced Library Laboratory: Build Your Own Library
// Angular Security Course - Web Security Fundamentals

// Angular Security
// Make Libs

// /courses/dnu3hkjJoUA3GbhPWv5F -> Serverless Angular
// /courses/cYg5PdC7A0VEGvWhbkgp -> Angular for beginers
