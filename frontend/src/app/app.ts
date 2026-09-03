import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  mensajeBackend = signal<string>('Cargando mensaje...');
  estadoBackend = signal<string>('Consultando estado...');
  
  private http = inject(HttpClient);

  ngOnInit(): void {
    const baseUrl = 'https://effective-bassoon-4jxw496rj4xxf7rq6-8080.app.github.dev/api';

    // Petición 1: Saludo
    this.http.get<{ mensaje: string }>(`${baseUrl}/saludo`).subscribe({
      next: (data) => this.mensajeBackend.set(data.mensaje),
      error: () => this.mensajeBackend.set('Error en /saludo')
    });

    // Petición 2: Estado del servidor
    this.http.get<{ estado: string; hora: string }>(`${baseUrl}/estado`).subscribe({
      next: (data) => this.estadoBackend.set(`${data.estado} - Server Time: ${data.hora}`),
      error: () => this.estadoBackend.set('Error en /estado')
    });
  }
}





