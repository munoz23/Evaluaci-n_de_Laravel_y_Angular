import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginService } from '@services/LoginService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <ion-icon name="school-outline" class="login-icon"></ion-icon>
          <h2>School Dashboard</h2>
        </div>
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="Correo electronico">
              <ion-icon name="person-outline"></ion-icon>
              Correo electronico:
            </label>
            <input 
              type="text" 
              id="email" 
              [(ngModel)]="email" 
              name="email" 
              required
              #emailInput="ngModel"
              [class.error]="emailInput.invalid && emailInput.touched">
            <div class="error-message" *ngIf="emailInput.invalid && emailInput.touched">
              email is required
            </div>
          </div>
          <div class="form-group">
            <label for="password">
              <ion-icon name="lock-closed-outline"></ion-icon>
              Contraseña:
            </label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              name="password" 
              required
              #passwordInput="ngModel"
              [class.error]="passwordInput.invalid && passwordInput.touched">
            <div class="error-message" *ngIf="passwordInput.invalid && passwordInput.touched">
              Password is required
            </div>
          </div>
          <button type="submit" [disabled]="loginForm.invalid">
            <ion-icon name="log-in-outline"></ion-icon>
            Login
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .login-box {
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      animation: fadeIn 0.5s ease-out;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
      color: #4a5568;
    }
    .login-icon {
      font-size: 3rem;
      color: #4c51bf;
      margin-bottom: 1rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: #4a5568;
      font-weight: 500;
    }
    ion-icon {
      font-size: 1.2rem;
      color: #4c51bf;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #4c51bf;
    }
    input.error {
      border-color: #e53e3e;
    }
    .error-message {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(to right, #4c51bf, #6b46c1);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    button:hover:not(:disabled) {
      transform: translateY(-1px);
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router,private loginService: LoginService) {}

  onLogin() {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe(
        (response) => {
          if (response.token) {
            console.log(response.token);
            this.loginService.storeToken(response.token);
            this.router.navigate(['/dashboard']);
            
          } else {
            alert('Error de inicio de sesión');
            
          }
        },
        (error) => {
          alert('Error de inicio de sesión');
          
        }
      );
    } else {
      // Maneja el caso en que los campos están vacíos
      console.error('Por favor, ingrese correo electrónico y contraseña');
    }
  }
}