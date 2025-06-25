import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../interfaces/course.interface';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-course-popup',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './course-popup.component.html',
  styleUrl: './course-popup.component.css'
})
export class CoursePopupComponent {
  @Input() course: Course | null = null;
  @Input() visible: boolean = false;
  @Output() save = new EventEmitter<Course>();
  @Output() close = new EventEmitter<void>();

  private builder:FormBuilder=inject(FormBuilder);

  form = this.builder.group({
    name: [this.course?.name || '', 
      Validators.required, Validators.minLength(2), Validators.maxLength(50)
    ],
    description: [this.course?.description || '', 
      Validators.required, Validators.minLength(5), Validators.maxLength(120)
    ],
    duration: [this.course?.duration || '', Validators.required],
    level: [this.course?.level || '', Validators.required],
    price: [this.course?.price || 0, [Validators.required, Validators.min(0)]]
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.form.patchValue({
        name: this.course.name,
        description: this.course.description,
        duration: this.course.duration,
        level: this.course.level,
        price: this.course.price
      });
    }
  }

  onSave() {
    let courseData: Course = {
      id: this.course?.id || undefined,
      name: this.form.value.name!,
      description: this.form.value.description!,
      duration: this.form.value.duration!,
      level: this.form.value.level!,
      price: this.form.value.price!
    };
    this.save.emit(courseData);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
