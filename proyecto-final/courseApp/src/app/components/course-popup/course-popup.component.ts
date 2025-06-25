import { Component, Input, Output, EventEmitter, inject, SimpleChanges, signal, effect } from '@angular/core';
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
  @Input() type:  'create' | 'edit' = 'create';
  @Input() set course(value: Course | null) {
    if (value != null){
      this.courseSignal.set(value);
    }
  }
  courseSignal = signal<Course | null>(null);
  @Input() visible: boolean = false;
  @Output() save = new EventEmitter<Course>();
  @Output() close = new EventEmitter<void>();

  private builder:FormBuilder=inject(FormBuilder);
  form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      duration: ['', Validators.required],
      level: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
  });

  constructor() {
    effect(() => {
      const c = this.courseSignal();
      if (c) {
        this.form.patchValue({
          name: c.name,
          description: c.description,
          duration: c.duration,
          level: c.level,
          price: c.price
        });
      } else {
        this.form.reset();
      }
    });

    window.addEventListener('keydown', this.handleEscape);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.visible) {
      this.onClose();
    }
  };

  onSave() {
    let courseData: Course = {
      id: this.courseSignal()?.id || undefined,
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
    this.form.reset();
    this.close.emit();
    this.courseSignal.set(null);
  }
}
