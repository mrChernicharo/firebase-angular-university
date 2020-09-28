import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Course } from "app/model/course";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    // valueChanges | snapshotChanges | stateChanges

    // this.db
    //   .collection("courses")
    //   .valueChanges()
    //   .subscribe((val) => console.log(val));

    this.db
      .collection("courses")
      .snapshotChanges()
      .subscribe((snaps) => {
        const courses: Course[] = snaps.map((snap) => {
          return <Course>{
            id: snap.payload.doc.id,
            ...(snap.payload.doc.data() as Object),
          };
        });
        console.log(courses);
      });

    // this.db
    //   .collection("courses")
    //   .stateChanges()
    //   .subscribe((stateChanges) => console.log(stateChanges));
  }
}
