import { Component, inject, signal } from '@angular/core';
import { TaskUser } from '../../business/entities';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-table-task',
  imports: [],
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.css'
})
export class TableTaskComponent {
  private service=inject(TaskService);
  tasks=signal<TaskUser[]>([]);

  constructor(){
    this.tasks.set(this.service.getTasks());
  }

  deleteTask(id:number){
     this.service.deleteTask(id);
  }
  
}
