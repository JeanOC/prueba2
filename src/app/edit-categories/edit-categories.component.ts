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
  categorias: any;
  ecategoria: any;

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

    /*this.categoriesService.getAllCategories(id).subscribe(categorias => {
      this.categorias = categorias;
    });*/
    const id = '3';
    this.categoriesService.editCategory(id).subscribe(([categorias, ecategoria]) => {
      this.categorias = categorias;
      this.ecategoria = ecategoria;
    });
  }

  clicTouch() {
    Object.values(this.categoriaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
