import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import IComment from '../interfaces/IComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // get(productId: number) {
  //   return this.http.get(this.apiUrl + 'products/' + productId + '/comments');
  // }

  create(comment: IComment, productId: number) {
    return this.http.post(this.apiUrl + 'products/' + productId + '/comments', comment);
  }
}
