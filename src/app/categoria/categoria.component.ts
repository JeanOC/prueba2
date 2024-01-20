import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriesService } from '../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{
  categoriaForm!: FormGroup;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.categoriaForm = this.fb.group({
      categoriaPadre: [0, Validators.required],
      nombre: ['', Validators.required],
      id: [0, [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required]
    });

    this.categoriesService.getAllCategories().subscribe(categorias => {
      this.categorias = categorias;
      console.log('Categorías obtenidas:', categorias);
    });
  }

  crearCategoria() {
    if (this.categoriaForm && this.categoriaForm.valid) {
      const parent = this.categoriaForm.get('categoriaPadre')?.value;
      const nombre = this.categoriaForm.get('nombre')?.value;
      const id = this.categoriaForm.get('id')?.value;
      const descripcion = this.categoriaForm.get('descripcion')?.value;

      if (nombre !== undefined && id !== undefined && descripcion !== undefined) {
        this.categoriesService.createCategory(nombre, parent, id, descripcion)
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
    Object.values(this.categoriaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
/*
nombreCategoria: string = '';
  idCategoria: number = 0;
  descripcionCategoria: string = '';

  constructor(
    private categorieService: CategoriesService
  ) {}

  crearCategoria() {
    this.categorieService.createCategory(this.nombreCategoria, this.idCategoria, this.descripcionCategoria)
      .subscribe(response => {
        console.log('Categoría creada con éxito:', response);
      }, error => {
        console.error('Error al crear la categoría:', error);
      });
  }

  // create function update 
  updateCategory() {
    this.categorieService.updateCategory(this.nombreCategoria, this.idCategoria, this.descripcionCategoria)
      .subscribe(response => {
        console.log('Categoría actualizada con éxito:', response);
      }, error => {
        console.error('Error al actualizar la categoría:', error);
      });
  }
  
  // create function delete
  deleteCategory() {
    this.categorieService.deleteCategory(this.idCategoria)
      .subscribe(response => {
        console.log('Categoría eliminada con éxito:', response);
      }, error => {
        console.error('Error al eliminar la categoría:', error);
      });
  }
*/
