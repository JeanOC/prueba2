import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { FormActions } from '../common/forms-action';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css']
})
export class ListaCursoComponent implements OnInit {
  courses: any[] = [];

  constructor(
    private coursesService: CoursesService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadPageData();
  }

  loadPageData() {
    this.coursesService.getAllCourses()
      .subscribe((response: any) => {
        this.courses = response;
        console.log('respuesta',response);
      }, error => {
        console.error('Error al obtener cursos:', error);
      });
  }

  eliminarCurso(courseId: number): void {
    this.coursesService.eliminarCurso(courseId)
      .subscribe(
        () => {
          console.log('Curso eliminada con éxito');
          // Actualizar la lista de cursos después de la eliminación si es necesario
          // Agrega la lógica para actualizar la lista según tu implementación
        },
        error => {
          console.error('Error al eliminar la curso:', error);
        }
      );
  }

}