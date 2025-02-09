import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '@models/student.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EstudiantesService } from '@services/EstudiantesService';

interface Grado {
  id: number;
  grado: string;
  seccion: string;
  
}

interface Data {
  grado: Grado;
  estudiante: Estudiante;
}


interface Estudiante {
  nombre: string;
  nombre_padre: string;
  nombre_madre: string;
  fecha_nacimiento: Date;
  fecha_ingreso: Date;

}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="dashboard">
      <header>
        <div class="header-content">
          <h1><ion-icon name="school-outline"></ion-icon> School Dashboard</h1>
          <button class="logout-btn" (click)="logout()">
            <ion-icon name="log-out-outline"></ion-icon>
            Logout
          </button>
        </div>
      </header>

      <div class="dashboard-content">
        <div class="actions">
          <button (click)="showStudentForm = true">
            <ion-icon name="person-add-outline"></ion-icon>
            Crear Estudiante
          </button>
          <button (click)="showgradoSearch = true">
            <ion-icon name="search-outline"></ion-icon>
            Buscar estudiante por grado
          </button>
        </div>

        <!-- Student Form Modal -->
        <div *ngIf="showStudentForm" class="modal" (click)="closeStudentModal($event)">
          <div class="modal-content">
            <div class="modal-header">
              <h2><ion-icon name="person-add-outline"></ion-icon> Crear estudiante</h2>
              <button class="close-btn" (click)="showStudentForm = false">
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <form (ngSubmit)="addStudent()" #studentForm="ngForm">
              <div class="form-group">
                <label><ion-icon name="person-outline"></ion-icon> Nombre del alumno:</label>
                <input
                  type="text"
                  [(ngModel)]="newStudent.nombre"
                  name="nombre"
                  required
                  #nombre="ngModel"
                  [class.error]="nombre.invalid && nombre.touched">
                <div class="error-message" *ngIf="nombre.invalid && nombre.touched">
                  Student name is required
                </div>
              </div>
              <div class="form-group">
                <label><ion-icon name="man-outline"></ion-icon> Nombre del padre:</label>
                <input
                  type="text"
                  [(ngModel)]="newStudent.nombre_padre"
                  name="nombre_padre"
                  required
                  #nombre_padre="ngModel"
                  [class.error]="nombre_padre.invalid && nombre_padre.touched">
                <div class="error-message" *ngIf="nombre_padre.invalid && nombre_padre.touched">
                  Father's name is required
                </div>
              </div>
              <div class="form-group">
                <label><ion-icon name="woman-outline"></ion-icon> Nombre de la madre:</label>
                <input
                  type="text"
                  [(ngModel)]="newStudent.nombre_madre"
                  name="nombre_madre"
                  required
                  #nombre_madre="ngModel"
                  [class.error]="nombre_madre.invalid && nombre_madre.touched">
                <div class="error-message" *ngIf="nombre_madre.invalid && nombre_madre.touched">
                  Mother's name is required
                </div>
              </div>
              <div class="form-group">
                <label><ion-icon name="school-outline"></ion-icon> Grado:</label>
                <input
                  type="text"
                  [(ngModel)]="newStudent.grado"
                  name="grado"
                  required
                  #grado="ngModel"
                  [class.error]="grado.invalid && grado.touched">
                <div class="error-message" *ngIf="grado.invalid && grado.touched">
                  Grado is required
                </div>
              </div>
              <div class="form-group">
                <label><ion-icon name="apps-outline"></ion-icon> Sección:</label>
                <input
                  type="text"
                  [(ngModel)]="newStudent.seccion"
                  name="seccion"
                  required
                  #seccion="ngModel"
                  [class.error]="seccion.invalid && seccion.touched">
                <div class="error-message" *ngIf="seccion.invalid && seccion.touched">
                  Sección is required
                </div>
              </div>
              <div class="form-group">
                <label><ion-icon name="calendar-outline"></ion-icon> Fecha de nacimiento:</label>
                <input
                  type="date"
                  [(ngModel)]="newStudent.fecha_nacimiento"
                  name="fecha_nacimiento"
                  required
                  #fecha_nacimiento="ngModel"
                  [class.error]="fecha_nacimiento.invalid && fecha_nacimiento.touched">
                <div class="error-message" *ngIf="fecha_nacimiento.invalid && fecha_nacimiento.touched">
                  La fecha de nacimiento es obligatoria
                </div>
              </div>
              <div class="form-group">
                <label><ion-icon name="calendar-outline"></ion-icon> Fecha de ingreso:</label>
                <input
                  type="date"
                  [(ngModel)]="newStudent.fecha_ingreso"
                  name="fecha_ingreso"
                  required
                  #fecha_ingreso="ngModel"
                  [class.error]="fecha_ingreso.invalid && fecha_ingreso.touched">
                <div class="error-message" *ngIf="fecha_ingreso.invalid && fecha_ingreso.touched">
                  Admission date is required
                </div>
              </div>
              <div class="button-group">
                <button type="submit" class="save-btn" [disabled]="studentForm.invalid">
                  <ion-icon name="save-outline"></ion-icon>
                  Save
                </button>
                <button type="button" class="cancel-btn" (click)="showStudentForm = false">
                  <ion-icon name="close-outline"></ion-icon>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- grado Search Modal -->
        <div *ngIf="showgradoSearch" class="modal" (click)="closegradoModal($event)">
          <div class="modal-content">
            <div class="modal-header">
              <h2><ion-icon name="search-outline"></ion-icon> Search by grado</h2>
              <button class="close-btn" (click)="showgradoSearch = false">
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <div class="form-group">
              <label><ion-icon name="school-outline"></ion-icon> Grado:</label>
              <input
                type="text"
                [(ngModel)]="searchgrado"
                name="searchgrado"
                placeholder="Enter grado to search">
            </div>
            <div class="button-group">
              <button (click)="searchBygrado()" class="search-btn" [disabled]="!searchgrado">
                <ion-icon name="search-outline"></ion-icon>
                Search
              </button>
            </div>
            <div *ngIf="gradoSearchResults.length > 0" class="search-results">
              <h3><ion-icon name="list-outline"></ion-icon> Results:</h3>
              <ul>
                <li *ngFor="let student of gradoSearchResults">
                  <ion-icon name="person-outline"></ion-icon>
                  Nombre: {{student.estudiante.nombre}} - 
                  Madre: {{student.estudiante.nombre_madre}} - 
                  Padre: {{student.estudiante.nombre_padre}} -
                  fecha_ingreso: {{student.estudiante.fecha_ingreso}} -
                  fecha_nacimiento: {{student.estudiante.fecha_nacimiento}}.
                  Grado: {{student.grado.grado}}
                  Seccion: {{student.grado.seccion}}
                    
                </li>
                
              </ul>
            </div>
            <div *ngIf="searchPerformed && gradoSearchResults.length === 0" class="no-results">
              <p><ion-icon name="alert-circle-outline"></ion-icon> No students found in this grado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background-color: #f7fafc;
    }
    header {
      background: linear-gradient(to right, #4c51bf, #6b46c1);
      color: white;
      padding: 1rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
    }
    .logout-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    .logout-btn:hover {
      background: rgba(255,255,255,0.2);
    }
    .dashboard-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    .actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .actions button {
      padding: 0.75rem 1.5rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      color: #4a5568;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .actions button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border-color: #4c51bf;
      color: #4c51bf;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease-out;
      z-index: 1000;
    }
    .modal-content {
      background-color: white;
      padding: 2rem;
      border-radius: 12px;
      width: 90%;
      max-width: 600px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;
    }
    .modal-header h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #4a5568;
    }
    .close-btn {
      background: none;
      border: none;
      color: #a0aec0;
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }
    .close-btn:hover {
      color: #4a5568;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: #4a5568;
      font-weight: 500;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .form-group input:focus {
      outline: none;
      border-color: #4c51bf;
      box-shadow: 0 0 0 3px rgba(76, 81, 191, 0.1);
    }
    .form-group input.error {
      border-color: #e53e3e;
    }
    .error-message {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    .button-group button {
      flex: 1;
      padding: 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
      font-weight: 500;
    }
    .button-group button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .save-btn {
      background: #4c51bf;
      color: white;
      border: none;
    }
    .save-btn:hover:not(:disabled) {
      background: #434190;
    }
    .cancel-btn {
      background: white;
      color: #4a5568;
      border: 2px solid #e2e8f0;
    }
    .cancel-btn:hover {
      border-color: #4c51bf;
      color: #4c51bf;
    }
    .search-btn {
      background: #4c51bf;
      color: white;
      border: none;
    }
    .search-results {
      margin-top: 1.5rem;
      padding: 1rem;
      background-color: #f7fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .search-results h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #4a5568;
      margin-bottom: 1rem;
    }
    .search-results ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .search-results li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .search-results li:last-child {
      border-bottom: none;
    }
    .no-results {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #fff5f5;
      border: 1px solid #feb2b2;
      border-radius: 8px;
      color: #c53030;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  showStudentForm = false;
  showgradoSearch = false;
  searchgrado = '';
  students: Student[] = [];
  gradoSearchResults: Data[] = [];
  searchPerformed = false;

  newStudent: Student = this.getEmptyStudent();

  constructor(private router: Router, private estudiantesServices: EstudiantesService) {}

  ngOnInit() {
   
  }

  private getEmptyStudent(): Student {
    return {
      nombre: '',
      nombre_padre: '',
      nombre_madre: '',
      grado: '',
      seccion: '',
      fecha_nacimiento: new Date(), 
      fecha_ingreso: new Date() 
    };
  }

  

  private saveStudents() {
    this.estudiantesServices.crear_alumno(this.students).subscribe((response) => {

        alert('Estudiante creado exitosamente');
  
    },(error)=>{
      alert('Error al crear estudiante')
      console.log(error);
    });

     
  }

  closeStudentModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.showStudentForm = false;
    }
  }

  closegradoModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.showgradoSearch = false;
    }
  }

  addStudent() {
    const student = { ...this.newStudent };
    this.students.push(student);
    this.saveStudents(); // Guarda e imprime en la consola
    this.showStudentForm = false;
    this.newStudent = this.getEmptyStudent();
  }

  searchBygrado() {

    this.searchPerformed = true;
    this.estudiantesServices.consultar_alumno(this.searchgrado).subscribe(
      (response) => {
        if (response.data.length > 0) {
          this.gradoSearchResults = response.data.map((estudiante: Estudiante) => ({ grado: response.data[0].grado, estudiante }));
          
          console.log(this.gradoSearchResults);
         
        } else {
          this.gradoSearchResults = [];
        }

    },(error)=>{});
  }

  logout() {
    this.estudiantesServices.logOut().subscribe((response) => {
      if ((response.status === 204) || (response.status === 200) || (response.status === undefined)) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        alert('Sesión cerrada exitosamente');
      } else {
        console.log(response.status);
      }
    }, (error) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        alert('Sesión cerrada exitosamente');
      }
    });
  }
}