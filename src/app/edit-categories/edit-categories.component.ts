import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent {
  categoriaForm!: FormGroup;
  categorias: any[] = [];
  ecategoria: any;

  constructor(
    private fb: FormBuilder, 
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.loadPageData();

    this.categoriaForm = this.fb.group({
      categoriaPadre: [0, Validators.required],
      nombre: ['', Validators.required],
      id: [0, [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id'); // Asumiendo que el parámetro se llama 'id'
      if (categoryId) {
        this.getMoodleCategories(categoryId);
      }
    });

  }

  loadPageData() {
    this.categoriesService.getAllCategories()
      .subscribe((response: any) => {
        this.categorias = response;
        console.log('respuesta',response);
      }, error => {
        console.error('Error al obtener categorías:', error);
      });
  }

  getMoodleCategories(categoryId: string): void {
    this.categoriesService.getCategoriaById(categoryId).subscribe(
      (data) => {
        console.log('Categorías de Moodle:', data);
        this.categorias = data; // Asigna los datos recuperados a la propiedad categorias

        // Asigna los valores al formulario
        this.categoriaForm.patchValue({
          categoriaPadre: data[0].parent, // Ajusta esto según la estructura real de tus datos
          nombre: data[0].name,
          id: data[0].id,
          descripcion: data[0].description
        });
      },
      (error) => {
        console.error('Error al obtener categorías de Moodle:', error);
      }
    );
  }

  clicTouch() {
    Object.values(this.categoriaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
