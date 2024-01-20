import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormActions } from '../common/forms-action';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadPageData();
  }

  loadPageData() {
    this.categoriesService.getAllCategories()
      .subscribe((response: any) => {
        this.categories = response;
        console.log('respuesta',response);
      }, error => {
        console.error('Error al obtener categorías:', error);
      });
  }

  eliminarCategoria(categoryId: number): void {
    this.categoriesService.eliminarCategoria(categoryId)
      .subscribe(
        () => {
          console.log('Categoría eliminada con éxito');
          // Actualizar la lista de categorías después de la eliminación si es necesario
          // Agrega la lógica para actualizar la lista según tu implementación
        },
        error => {
          console.error('Error al eliminar la categoría:', error);
        }
      );
  }

}