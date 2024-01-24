import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    ListaCategoriaComponent,
    EditCategoriesComponent,
    DeleteCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
