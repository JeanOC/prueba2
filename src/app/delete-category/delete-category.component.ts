import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}
  // Para eliminar directamente
this.categoriesService.deleteCategory(1).subscribe(
  (data) => {
    console.log('Categoría eliminada con éxito:', data);
    // Realizar acciones adicionales después de la eliminación
  },
  (error) => {
    console.error('Error al eliminar la categoría:', error);
  );
}

// Para mover a otra categoría
this.categoriesService.deleteCategory(1, 2).subscribe(
  (data) => {
    console.log('Categoría movida con éxito:', data);
    // Realizar acciones adicionales después de la movida
  },
  (error) => {
    console.error('Error al mover la categoría:', error);
  );
}

// Para eliminar recursivamente
this.categoriesService.deleteCategory(1, null, 1).subscribe(
  (data) => {
    console.log('Categoría y sus contenidos eliminados recursivamente con éxito:', data);
    // Realizar acciones adicionales después de la eliminación recursiva
  },
  (error) => {
    console.error('Error al eliminar recursivamente la categoría:', error);
  );
}

}
