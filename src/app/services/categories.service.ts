import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
    const url = `${this.moodleUrl}?wstoken=${this.token}&wsfunction=core_course_get_categories&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
    console.log('url del servicio',url)
  }
//listar cursos
  getAllCourses(): Observable<any[]> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
    console.log('url del servicio',url)
  }

  // getCategoriaById(id: string): Observable<any> {
  //   const functionname = 'core_course_get_categories';
  //   const serverurl =
  //     `${this.moodleUrl}/webservice/rest/server.php` +
  //     `?wstoken=${this.token}&wsfunction=${functionname}` +
  //     `&moodlewsrestformat=json&addsubcategories=0&criteria[0][key]=id&criteria[0][value]=${id}`;
  
  //   return this.http.get(serverurl).pipe(
  //     map(response => {
  //       console.log('exito')
  //       return response;
  //     }),
  //     catchError(error => {
  //       console.error('Error en la solicitud:', error);
  //       return throwError('Error al obtener la categoría'); // Puedes personalizar este mensaje
  //     })
  //   );
  // }

  getCategoriaById(id: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_get_categories');
    body.set('moodlewsrestformat', 'json');
    body.set('addsubcategories', '0');
    body.set('criteria[0][key]', 'id');
    body.set('criteria[0][value]', id.toString());
    

    const options = {
      headers,
    };

    return this.http.post(this.moodleUrl, body.toString(), options)
      .pipe(
        catchError(this.handleError)
      );
  }

  editCategory(id: number): Observable<any> {
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

  updateCategoria(id: string, nombre: string, parent: string, idnumber: string, descripcion: string): Observable<any> {
    const functionname = 'core_course_update_categories';
    const serverurl =
      `${this.moodleUrl}?wstoken=${this.token}&wsfunction=${functionname}` +
      `&moodlewsrestformat=json&categories[0][id]=${id}` +
      `&categories[0][name]=${nombre}&categories[0][parent]=${parent}` +
      `&categories[0][idnumber]=${idnumber}&categories[0][description]=${descripcion}&categories[0][descriptionformat]=1`;

    return this.http.get(serverurl);
  }
}
