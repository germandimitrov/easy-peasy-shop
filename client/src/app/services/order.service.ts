import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import IComment from '../interfaces/IComment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  create() {
    return this.http.post(this.apiUrl + 'orders/', {test: 'this is only a test'});
  }

}
