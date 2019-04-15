import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
import { AuthService } from './auth.service';
import IUser from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  get(): Observable<IUser> {
    const id = Number(this.authService.get('id'));

    return this.http.get<IUser>(this.apiUrl + 'users/' + id);
  }

  getUserOrders(): Observable<any[]> {
    const id = Number(this.authService.get('id'));
    return this.http.get<any[]>(this.apiUrl + 'users/' + id + '/orders');
  }


}
