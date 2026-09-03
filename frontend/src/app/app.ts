import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface Tarea {
  id?: number;
  titulo: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  tareas = signal<Tarea[]>([]);
  isLoggedIn = signal<boolean>(false);
  token = signal<string | null>(null);

  usernameInput = '';
  passwordInput = '';
  errorMessage = signal<string>('');

  private http = inject(HttpClient);
 private baseUrl = '/api';
  ngOnInit(): void {
    // Si ya existe sesión previa, carga las tareas directamente
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      this.token.set(savedToken);
      this.isLoggedIn.set(true);
      this.cargarTareas();
    }
  }

  login(): void {
    if (!this.usernameInput || !this.passwordInput) {
      this.errorMessage.set('Ingresa usuario y contraseña');
      return;
    }

    this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, {
      username: this.usernameInput,
      password: this.passwordInput
    }).subscribe({
      next: (res) => {
        localStorage.setItem('auth_token', res.token);
        this.token.set(res.token);
        this.isLoggedIn.set(true);
        this.errorMessage.set('');
        this.cargarTareas(); // Carga las tareas desde H2 inmediatamente
      },
      error: () => this.errorMessage.set('Usuario o contraseña incorrectos')
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.token.set(null);
    this.isLoggedIn.set(false);
    this.tareas.set([]);
  }

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:1234') // Envia credenciales válidas al backend
      })
    };
  }

  cargarTareas(): void {
    this.http.get<Tarea[]>(`${this.baseUrl}/tareas`, this.getAuthHeaders()).subscribe({
      next: (data) => this.tareas.set(data),
      error: (err) => console.error('Error al cargar tareas de H2', err)
    });
  }

  agregar(titulo: string): void {
    if (!titulo.trim()) return;

    this.http.post<Tarea>(`${this.baseUrl}/tareas`, { titulo }, this.getAuthHeaders()).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error('Error al agregar tarea', err)
    });
  }

  eliminar(id?: number): void {
    if (!id) return;

    this.http.delete(`${this.baseUrl}/tareas/${id}`, this.getAuthHeaders()).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error('Error al eliminar tarea', err)
    });
  }
}






