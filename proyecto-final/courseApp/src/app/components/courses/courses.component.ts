import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Course } from '../../interfaces/course.interface';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CoursePopupComponent } from '../course-popup/course-popup.component';

@Component({
  selector: 'app-courses',
  imports: [MatGridListModule, MatCardModule, MatButtonModule, MatIconModule, CommonModule, CoursePopupComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  private service =  inject(ApiService);
  image: string = 'https://picsum.photos/200/300';
  courses = signal<Course[]>([]);
  adminPanel: boolean = false;
  popupVisible = false;
  selectedCourse: Course | null = null;
  type : 'create' | 'edit' = 'create';

  ngOnInit() {
    this.refreshCourses();
    const currentUrl = window.location.pathname;
    this.adminPanel = currentUrl.includes('admin-panel');
  }

  refreshCourses() {
        this.service.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  deleteCourse(courseId: number) {
    this.service.deleteCourse(courseId).subscribe({
      next: () => {
        this.courses.set(this.courses().filter(course => course.id !== courseId));
      },
      error: (err) => {
        console.error('Error deleting course:', err);
      }
    });
  }

  openCreatePopup() {
    this.selectedCourse = null;
    this.popupVisible = true;
    this.type = 'create';
  }

  openEditPopup(course: Course) {
    this.selectedCourse = course;
    this.popupVisible = true;
    this.type = 'edit';
  }

  onSaveCourse(course: Course) {
    if (course.id) {
      this.service.updateCourse(course).subscribe({
        next: () => {
          this.refreshCourses();
        },
        error: (err) => {
          console.error('Error updating course:', err);
        }}
      );
    } else {
      this.service.addCourse(course).subscribe(
          {
            next: () => {
              this.refreshCourses();
            },
            error: (err) => {
              console.error('Error adding course:', err);
            }
          }
        )
      this.popupVisible = false;
    }
  }
}
