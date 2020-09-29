import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { Course } from "../model/course";
import { convertSnaps } from "./db-utils";

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
        map((snaps) => convertSnaps<Course>(snaps)),
        first()
      );
  }

  findCourseByUrl(courseUrl: string) {
    return this.db
      .collection("courses", (ref) => {
        return ref.where("url", "==", courseUrl);
      })
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const courses = convertSnaps<Course>(snaps);

          return courses.length === 1 ? courses[0] : undefined;
        }),
        first()
      );
  }
}
