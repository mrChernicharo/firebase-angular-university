import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    return this.db
      .collection("courses", (ref) =>
        // ref.where("seqNo", ">=", 2).where("seqNo", "<=", 4)
        ref.orderBy("seqNo")
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            return <Course>{
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as Object),
            };
          });
        }),
        first()
      );
  }
}
