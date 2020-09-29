import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Lesson } from "app/model/lesson";
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

  findLessons(
    courseId: string,
    sortOrder: firebase.firestore.OrderByDirection = "asc",
    pageNumber = 0,
    pageSize = 4
  ): Observable<Lesson[]> {
    return this.db
      .collection(`courses/${courseId}/lessons`, (ref) => {
        return ref
          .orderBy("seqNo", sortOrder)
          .limit(pageSize)
          .startAfter(pageNumber * pageSize);
      })
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return convertSnaps<Lesson>(snaps);
        }),
        first()
      );
  }
}
