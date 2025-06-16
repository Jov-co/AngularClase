import { Component, inject, signal, ViewChild } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../business/dog-interface';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dog-table',
  imports: [
    MatTableModule, 
    MatIconModule, 
    MatCardModule, 
    MatButtonModule, 
    RouterLink
  ],
  templateUrl: './dog-table.component.html',
  styleUrl: './dog-table.component.css'
})
export class DogTableComponent {
  displayedColumns: string[] = ['breed', 'description', 'actions'];
  @ViewChild(MatTable) table!: MatTable<Dog>;

  private service: DogService = inject(DogService);
  dogs = signal<Dog[]>([]);
  private suscriptions: Array<any> = [];

  ngOnInit() {
    this.service.getDogs().subscribe({
      next: (data) => {
        this.dogs.set(data);
      },
      error: (err) => {
        console.error("Error al obtener la información: ", err);
      }
    });
    this.table.renderRows();
    this.suscriptions.push(
      this.service
    );
  }

  ngOnDestroy() {
    this.suscriptions.forEach(s => s.unsubscribe());
  }

  deleteDog(id: number) {
    this.service.deleteDog(id).subscribe({
      next: () => {
        this.dogs.update(currentDogs => currentDogs.filter(d => d.id !== id));
        this.table.renderRows();
      },
      error: (err) => {
        console.error("Error al eliminar el perro: ", err);
      }
    });
  }


}
