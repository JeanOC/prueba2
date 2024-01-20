import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { CursoComponent } from './curso/curso.component';
import { ListaCursoComponent } from './lista-curso/lista-curso.component';


const routes: Routes = [
  { path: 'categoria', component: CategoriaComponent },
  { path: 'lista', component: ListaCategoriaComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'lista_curso', component: ListaCursoComponent },
  { path: 'editar/:id', component: EditCategoriesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
