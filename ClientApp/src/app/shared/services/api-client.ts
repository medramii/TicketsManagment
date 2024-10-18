import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiClient implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    
    const token = localStorage.getItem('UserToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const modifiedRequest = request.clone({
      headers: headers,
      url: `${environment.BASE_URL}${request.url}`
    });

    return next.handle(modifiedRequest);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
