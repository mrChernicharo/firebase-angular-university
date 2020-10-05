import * as functions from "firebase-functions";
import { db } from "./init";

export const onAddLesson = functions.firestore
  .document("courses/{courseId}/lessons/{lessonId}")
  .onCreate(async (snap, context) => {
    // const courseId = context.params.courseId;

    console.log("running onAddLesson trigger ...");

    return courseTransaction(snap, (course) => {
      return { lessonsCount: +course.lessonsCount + 1 };
    });
  });

export const onDeleteLesson = functions.firestore
  .document("courses/{courseId}/lessons/{lessonId}")
  .onDelete(async (snap, context) => {
    console.log("running onAddLesson trigger ...");

    return courseTransaction(snap, (course) => {
      return { lessonsCount: +course.lessonsCount - 1 };
    });
  });

function courseTransaction(snap, cb: Function) {
  return db.runTransaction(async (transaction) => {
    const courseRef = snap.ref.parent
      .parent as FirebaseFirestore.DocumentReference<
      FirebaseFirestore.DocumentData
    >;

    const courseSnapshot = await transaction.get(courseRef);

    const course = courseSnapshot.data();

    if (course) {
      const changes = cb(course);
      transaction.update(courseRef, changes);
    }
  });
}
