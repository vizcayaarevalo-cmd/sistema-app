import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  mensajeBackend = signal<string>('Cargando datos del backend...');
  private http = inject(HttpClient);

  ngOnInit(): void {
    const urlBackend = 'https://effective-bassoon-4jxw496rj4xxf7rq6-8080.app.github.dev/api/saludo';

    this.http.get<{ mensaje: string }>(urlBackend).subscribe({
      next: (data) => this.mensajeBackend.set(data.mensaje),
      error: (err) => {
        console.error('Error detallado:', err);
        this.mensajeBackend.set('Error al conectar con Spring Boot');
      }
    });
  }
}





