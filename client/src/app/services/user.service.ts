import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable} from 'rxjs';
import IProduct from '../interfaces/IProduct';
import IUser from '../interfaces/IUser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  get(): Observable<IUser> {
    const userId = this.authService.get('id');
    return this.http.get<IUser>(this.apiUrl + 'users/' + userId);
  }

}
