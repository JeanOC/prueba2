import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private moodleUrl = 'http://localhost/webservice/rest/server.php';
  private token = '6ce486308202a4eda869e2287d885d47';

  constructor(
    private http: HttpClient
  ) { }

  // create fuction createCourse
  createCourse(nombre: string, nombreCorto: string, categoryid: string, idnumber: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_create_courses');
    body.set('moodlewsrestformat', 'json');
    body.set('courses[0][fullname]', nombre);
    body.set('courses[0][shortname]', nombreCorto);
    body.set('courses[0][categoryid]', categoryid);
    body.set('courses[0][idnumber]', idnumber.toString());

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
   * list all curso
   */

  getAllCategories(): Observable<any[]> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
    console.log('url del servicio',url)
  }
//listar cursos
  getAllCourses(): Observable<any[]> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
    console.log('url del servicio',url)
  }




  obtenerCurso(courseId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_get_courses');
    body.set('moodlewsrestformat', 'json');
    body.set('criteria[0][key]', 'id');
    body.set('criteria[0][value]', courseId.toString());

    const options = { headers };

    return this.http.post<any[]>(this.moodleUrl, body.toString(), options)
      .pipe(
        map(response => response[0]), // Tomar el primer elemento de la respuesta (suponiendo que es la categoría)
        catchError(this.handleError)
      );
  }

 eliminarCurso(courseId: number): Observable<any> {
    console.log('Iniciando eliminación de cueso con ID:', courseId);

    return this.obtenerCurso(courseId).pipe(
      tap((cursoAntesEliminacion: any) => {
        console.log('Datos de la cueso antes de la eliminación:', cursoAntesEliminacion);
      }),
      catchError(error => {
        console.error('Error al obtener datos de la cueso antes de la eliminación:', error);
        return throwError('Error al obtener datos de la cueso antes de la eliminación.');
      }),
      // Realizar la eliminación
      switchMap(() => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        });

        const body = new HttpParams()
          .set('wstoken', this.token)
          .set('wsfunction', 'core_course_delete_courses')
          .set('moodlewsrestformat', 'json')
          .set('courseids[0]', courseId.toString());

        const options = { headers };

        return this.http.post<void>(this.moodleUrl, body.toString(), options);
      }),
      catchError(error => {
        console.error('Error en la eliminación de cueso:', error);
        return throwError('Error al eliminar la cueso. Verifica los logs del servidor Moodle para obtener más detalles.');
      })
    );
  }




  editCourse(id: string): Observable<any> {
    const headers = new HttpHeaders();

    const serverurl = new HttpParams()
      .set('wstoken', this.token)
      .set('wsfunction', 'core_course_get_courses')
      .set('moodlewsrestformat', 'json');

    const serverurl2 = new HttpParams()
      .set('wstoken', this.token)
      .set('wsfunction', 'core_course_get_courses')
      .set('moodlewsrestformat', 'json')
      .set('addsubcourses', '0')
      .set('criteria[0][key]', 'id')
      .set('criteria[0][value]', id);

    const options = {
      headers,
    };

    const cursos$ = this.http.get(`${this.moodleUrl}`, { params: serverurl, ...options });
    const ecurso$ = this.http.get(`${this.moodleUrl}`, { params: serverurl2, ...options });

    return forkJoin([cursos$, ecurso$]);
  }
}
