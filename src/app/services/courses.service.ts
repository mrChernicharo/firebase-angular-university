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
      .collection("courses", (ref) => ref.orderBy("seqNo"))
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

// db.collection("courses", (ref) =>
// ref.orderBy("seqNo", "desc").where("seqNo", "==", 3)
// )

// db.collection("courses", (ref) =>
// ref
//   .orderBy("seqNo", "asc")
//   .where("seqNo", ">=", 2)
//   .where("seqNo", "<", 9)
// )

// db.collection("courses", (ref) =>
// ref.orderBy("seqNo", "asc").startAt(0).endAt(5)

// db.collection("courses", (ref) =>
// ref.orderBy("seqNo", "asc").startAfter(-1).endAt(5)

// db.collection("courses", (ref) =>
//         ref.where("categories", "array-contains", "BEGINNER")
// )

//  db.collection("courses", (ref) =>
//      ref.where("categories", "array-contains", "ADVANCED")
//    )
