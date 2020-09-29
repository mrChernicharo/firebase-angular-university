import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { finalize, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "app/services/courses.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  course: Course;
  lessons: Lesson[];
  displayedColumns = ["seqNo", "description", "duration"];
  dataSource: any;
  lastPageLoaded = 0;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];
    console.log(this.route.snapshot);

    this.isLoading = true;

    this.coursesService
      .findLessons(this.course.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((lessons) => {
        this.lessons = lessons;
      });
  }

  loadMore() {
    this.lastPageLoaded++;
    this.isLoading = true;

    this.coursesService
      .findLessons(this.course.id, "asc", this.lastPageLoaded)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((lessons) => (this.lessons = this.lessons.concat(lessons)));
  }
}
