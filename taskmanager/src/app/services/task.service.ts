import { Injectable } from '@angular/core';
import { TaskUser } from '../business/entities';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:TaskUser[];
  private idTasks:number=0;

  constructor() {this.tasks=[];}

  getTasks():TaskUser[]{return this.tasks;}

  insertTask(task:TaskUser){
     if(this.tasks.length === 0) this.idTasks=0;
     
     task.id=++this.idTasks;
     this.tasks.push(task);
  }

  deleteTask(id:number){
    const index=this.tasks.findIndex(task=>task.id === id);
    if(index !== -1){
        this.tasks.splice(index, 1);
    }
  }

}
