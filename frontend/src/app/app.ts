import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Tarea {
  id?: number;
  titulo: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  tareas = signal<Tarea[]>([]);
  
  private http = inject(HttpClient);
  private baseUrl = 'https://effective-bassoon-4jxw496rj4xxf7rq6-8080.app.github.dev/api/tareas';

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.http.get<Tarea[]>(this.baseUrl).subscribe({
      next: (data) => this.tareas.set(data),
      error: (err) => console.error('Error al cargar tareas', err)
    });
  }

  agregar(titulo: string): void {
    if (!titulo.trim()) return;
    
    this.http.post<Tarea>(this.baseUrl, { titulo }).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error('Error al agregar tarea', err)
    });
  }

  eliminar(id?: number): void {
    if (!id) return;

    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error('Error al eliminar tarea', err)
    });
  }
}






