import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CoursesService } from "app/services/courses.service";
import { concatMap, last, tap } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  description: string;

  course: Course;

  uploadPercentage$: Observable<number>;
  downloadURL$: Observable<string>;
  saveURL$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private courseService: CoursesService,
    private storage: AngularFireStorage
  ) {
    this.course = course;
    const titles = course.titles;

    this.form = fb.group({
      description: [titles.description, Validators.required],
      longDescription: [titles.longDescription, Validators.required],
    });
  }

  ngOnInit() {}

  uploadFile(event) {
    const file: File = event.target.files[0];

    const filePath = `courses/${this.course.id}/${file.name}/`;

    const task = this.storage.upload(filePath, file);

    this.uploadPercentage$ = task.percentageChanges();

    this.downloadURL$ = task.snapshotChanges().pipe(
      last(),
      tap((snap) => console.log(snap)),
      concatMap(() => this.storage.ref(filePath).getDownloadURL())
    );

    this.saveURL$ = this.downloadURL$.pipe(
      concatMap((url) => {
        console.log(url);
        return this.courseService.saveCourse(this.course.id, {
          uploadedImageUrl: url,
        });
      })
    );

    this.saveURL$.subscribe();
  }

  save() {
    const changes = this.form.value;

    this.courseService
      .saveCourse(this.course.id, { titles: changes })
      .subscribe(() => this.dialogRef.close(this.form.value));
  }

  close() {
    this.dialogRef.close();
  }
}
