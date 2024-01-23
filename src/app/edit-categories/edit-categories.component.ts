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
      idnumber: [0, [Validators.required, Validators.min(1)]],
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
          idnumber: data[0].idnumber,
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

  updateCategory(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el id directamente de la URL
  
    // Verificar si el valor de id es válido antes de enviar la solicitud
    if (id !== undefined && id !== null) {
      const nombre = this.categoriaForm.value.nombre;
      const idnumber = this.categoriaForm.value.idnumber;
      const parent = this.categoriaForm.value.categoriaPadre;
      const descripcion = this.categoriaForm.value.descripcion;
  
      this.categoriesService.updateCategory(id, nombre, idnumber, parent, descripcion).subscribe(
        (data) => {
          alert('Categoría creada con éxito');
          console.log('Categoría actualizada con éxito:', data);
          this.router.navigate(['/lista']);
          // Puedes realizar acciones adicionales después de la actualización
        },
        (error) => {
          console.error('Error al actualizar la categoría:', error);
        }
      );
    } else {
      console.error('El valor de "id" es undefined o null.');
    }
  }

}
