import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DogService } from '../../services/dog.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { Dog } from '../../business/dog-interface';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dog-form',
  imports: [
    ReactiveFormsModule, 
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './dog-form.component.html',
  styleUrl: './dog-form.component.css'
})
export class DogFormComponent {
  private service: DogService = inject(DogService);
  private build = inject(FormBuilder);
  private router = inject(Router);

  form = this.build.group({
    breed: ['',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ],
        updateOn: 'change'
      }
    ],

    description: ['',
      {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200)
        ],
        updateOn: 'change'
      }
    ],

    urlImage: ['',
      {
        validators: [
          Validators.required,
          // Validators.pattern('https?://.+.(jpg|jpeg|png)$')
        ],
        updateOn: 'change'
      }
    ]
  });


  submit(){
    let breed = this.form.value.breed;
    let description = this.form.value.description;
    let urlImage = this.form.value.urlImage;

    let dog: Dog = {
      breed: breed!,
      description: description!,
      urlImage: urlImage!
    };
    this.service.insertDog(dog).pipe(take(1)).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['dogs']);
      },
      error: (err) => {
        console.error('Error inserting dog:', err);
      }
    });
  }
}
