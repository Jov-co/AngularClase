import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { TableTaskComponent } from './components/table-task/table-task.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormTaskComponent, TableTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taskmanager';
}
