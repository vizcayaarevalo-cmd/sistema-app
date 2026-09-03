import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  tareas = signal<string[]>([]);
  
  private http = inject(HttpClient);
  private baseUrl = 'https://effective-bassoon-4jxw496rj4xxf7rq6-8080.app.github.dev/api/tareas';

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.http.get<string[]>(this.baseUrl).subscribe({
      next: (data) => this.tareas.set(data),
      error: (err) => console.error('Error al cargar tareas', err)
    });
  }

  agregar(nuevaTarea: string): void {
    if (!nuevaTarea.trim()) return;
    
    this.http.post<string[]>(this.baseUrl, nuevaTarea, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (data) => this.tareas.set(data),
      error: (err) => console.error('Error al agregar tarea', err)
    });
  }

  eliminar(index: number): void {
    this.http.delete<string[]>(`${this.baseUrl}/${index}`).subscribe({
      next: (data) => this.tareas.set(data),
      error: (err) => console.error('Error al eliminar tarea', err)
    });
  }
}







