import * as functions from "firebase-functions";
import { db } from "./init";

export const onAddLesson = functions.firestore
  .document("courses/{courseId}/lessons/{lessonId}")
  .onCreate(async (snap, context) => {
    // const courseId = context.params.courseId;

    console.log("running onAddLesson trigger ...");

    db.runTransaction(async (transaction) => {
      const courseRef = snap.ref.parent
        .parent as FirebaseFirestore.DocumentReference<
        FirebaseFirestore.DocumentData
      >;

      const courseSnapshot = await transaction.get(courseRef);

      const course = courseSnapshot.data();

      if (course) {
        const changes = { lessonsCount: +course.lessonsCount + 1 };
        transaction.update(courseRef, changes);
      }
    });
  });
