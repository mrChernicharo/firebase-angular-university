import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { tap } from "rxjs/operators";
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
  i = 0;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];
    console.log(this.route.snapshot);

    this.coursesService.findLessons(this.course.id).subscribe((lessons) => {
      this.lessons = lessons;
    });
  }

  loadMore() {
    // implementação rude do load More
    this.coursesService
      .findLessons(this.course.id, "asc", ++this.i)
      .subscribe((lessons) => {
        this.lessons = lessons;
      });
  }
}
