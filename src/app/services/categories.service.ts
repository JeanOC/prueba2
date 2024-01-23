import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private moodleUrl = 'http://localhost/webservice/rest/server.php';
  private token = '643f14fbddb213e6997eed190934cae2';

  constructor(
    private http: HttpClient
  ) { }

  // create fuction createCategory
  createCategory(nombre: string, parent: string, id: number, descripcion: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_create_categories');
    body.set('moodlewsrestformat', 'json');
    body.set('categories[0][name]', nombre);
    body.set('categories[0][parent]', parent);
    body.set('categories[0][idnumber]', id.toString());
    body.set('categories[0][description]', descripcion);

    const options = {
      headers,
    };

    return this.http.post(this.moodleUrl, body.toString(), options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * list all categories
   */
  getAllCategories(): Observable<any[]> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_get_categories&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
    console.log('url del servicio',url)
  }
//listar cursos

  getAllCourses(): Observable<any[]> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
    console.log('url del servicio',url)
  }




  obtenerCategoria(categoryId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_get_categories');
    body.set('moodlewsrestformat', 'json');
    body.set('criteria[0][key]', 'id');
    body.set('criteria[0][value]', categoryId.toString());

    const options = { headers };

    return this.http.post<any[]>(this.moodleUrl, body.toString(), options)
      .pipe(
        map(response => response[0]), // Tomar el primer elemento de la respuesta (suponiendo que es la categoría)
        catchError(this.handleError)
      );
  }

 eliminarCategoria(categoryId: number): Observable<any> {
    console.log('Iniciando eliminación de categoría con ID:', categoryId);

    return this.obtenerCategoria(categoryId).pipe(
      tap((categoriaAntesEliminacion: any) => {
        console.log('Datos de la categoría antes de la eliminación:', categoriaAntesEliminacion);
      }),
      catchError(error => {
        console.error('Error al obtener datos de la categoría antes de la eliminación:', error);
        return throwError('Error al obtener datos de la categoría antes de la eliminación.');
      }),
      // Realizar la eliminación
      switchMap(() => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        });

        const body = new HttpParams()
          .set('wstoken', this.token)
          .set('wsfunction', 'core_course_delete_categories')
          .set('moodlewsrestformat', 'json')
          .set('categoryids[0]', categoryId.toString());

        const options = { headers };

        return this.http.post<void>(this.moodleUrl, body.toString(), options);
      }),
      catchError(error => {
        console.error('Error en la eliminación de categoría:', error);
        return throwError('Error al eliminar la categoría. Verifica los logs del servidor Moodle para obtener más detalles.');
      })
    );
  }




  editCategory(id: string): Observable<any> {
    const headers = new HttpHeaders();

    const serverurl = new HttpParams()
      .set('wstoken', this.token)
      .set('wsfunction', 'core_course_get_categories')
      .set('moodlewsrestformat', 'json');

    const serverurl2 = new HttpParams()
      .set('wstoken', this.token)
      .set('wsfunction', 'core_course_get_categories')
      .set('moodlewsrestformat', 'json')
      .set('addsubcategories', '0')
      .set('criteria[0][key]', 'id')
      .set('criteria[0][value]', id);

    const options = {
      headers,
    };

    const categorias$ = this.http.get(`${this.moodleUrl}`, { params: serverurl, ...options });
    const ecategoria$ = this.http.get(`${this.moodleUrl}`, { params: serverurl2, ...options });

    return forkJoin([categorias$, ecategoria$]);
  }
}
