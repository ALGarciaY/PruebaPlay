import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.userName, this.password).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/products']);
        } else {
          alert('Credenciales incorrectas, intenta de nuevo.');
        }
      },
      error: () => {
        alert('Error al conectar con el servidor');
      }
    });
  }
}
