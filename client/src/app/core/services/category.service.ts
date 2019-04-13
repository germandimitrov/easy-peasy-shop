import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import ICategory from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl + 'categories');
  }

  create(category): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiUrl + 'categories', category);
  }

}
