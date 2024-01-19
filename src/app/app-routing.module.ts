import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';


const routes: Routes = [
  { path: 'categoria', component: CategoriaComponent },
  { path: 'lista', component: ListaCategoriaComponent },
  { path: 'editar/:id', component: EditCategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
