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
}

// Angular Advanced Library Laboratory: Build Your Own Library
// Angular Security Course - Web Security Fundamentals
