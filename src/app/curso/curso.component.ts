import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoursesService } from '../services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit{
  cursoForm!: FormGroup;
  cursos: any[] = [];
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    ) {}

  ngOnInit() {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      nombreCorto: ['', Validators.required],
      categoryid: [0, Validators.required],
      idnumber: [0, [Validators.required, Validators.min(1)]],
    });

    this.categoriesService.getAllCourses().subscribe(cursos => {
      this.cursos = cursos;
      console.log('Curso obtenidas:', cursos);
    });

    this.categoriesService.getAllCategories().subscribe(categorias => {
      this.categorias = categorias;
      console.log('Categorías obtenidas:', categorias);
    });
  }

  crearCurso() {
    if (this.cursoForm && this.cursoForm.valid) {
      const nombre = this.cursoForm.get('nombre')?.value;
      const nombreCorto = this.cursoForm.get('nombreCorto')?.value;
      const categoryid = this.cursoForm.get('categoryid')?.value;
      const idnumber = this.cursoForm.get('idnumber')?.value;


      if (nombre !== undefined && nombreCorto !== undefined && categoryid !== undefined && idnumber !== undefined) {
        this.coursesService.createCourse(nombre, nombreCorto, categoryid,idnumber)
          .subscribe(response => {
            console.log('Curso creado con éxito:', response);
            alert('Curso creado con éxito');
            this.router.navigate(['/lista_curso']);
          }, error => {
            console.error('Error al crear el curso:', error);
            alert('Error al crear el curso');
          });
      }
    }
  }
//crear curso
  /*crearCurso() {
    if (this.categoriaForm && this.categoriaForm.valid) {
      const nombre = this.categoriaForm.get('nombre')?.value;
      const shortname = this.categoriaForm.get('shortname')?.value;
      const id = this.categoriaForm.get('id')?.value;
      const descripcion = this.categoriaForm.get('descripcion')?.value;

      if (nombre !== undefined && id !== undefined && descripcion !== undefined) {
        this.categoriesService.createCategory(nombre, shortname, id, descripcion)
          .subscribe(response => {
            console.log('Categoría creada con éxito:', response);
            alert('Categoría creada con éxito');
            this.router.navigate(['/lista']);
          }, error => {
            console.error('Error al crear la categoría:', error);
            alert('Error al crear la categoría');
          });
      }
    }
  }*/

  clicTouch() {
    Object.values(this.cursoForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
