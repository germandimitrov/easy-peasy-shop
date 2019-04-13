import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import RegisterModel from '../../models/RegisterModel';
import LoginModel from '../../models/LoginModel';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import IAuthResponse from '../interfaces/IAuthResponse';
import IUser from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authToken;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  register(userData: RegisterModel): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.apiUrl + 'register', userData);
  }

  login(userData: LoginModel): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.apiUrl + 'login', userData);
  }

  authenticate(user: IUser, token: string): void {

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.roles && user.roles.length) {
        const role = user.roles.find(e => e.name === 'Admin');
        if (role) {
          localStorage.setItem('role', role.name);
        }
      }
      this.setToken(token);
    }
  }

  setToken(token: string) {
    this.authToken = token;
  }

  getToken(): string {
    return this.authToken;
  }

  isUserLogged(): boolean  {
    // return this.getToken() === localStorage.getItem('token');
    return localStorage.getItem('token') !== null;
  }

  isAdmin(): boolean {
    // change to Enum
    return localStorage.getItem('role') === 'Admin';
  }

  get(item: string): string {
    return localStorage.getItem('user') ?
      JSON.parse(localStorage.getItem('user'))[item]
      : '';
  }

  logout() {
    localStorage.clear();
    // this.setToken(null);
  }

}
