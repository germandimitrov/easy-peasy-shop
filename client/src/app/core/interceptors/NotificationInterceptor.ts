import {
  HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpResponse,
 HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  api = environment.apiUrl;
  constructor(private toastr: ToastrService, private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((success: any) => {
        if (this.api + 'login' === success.url) {
          setTimeout(() => {
            this.toastr.success('Hello there!');
          });
        }
        else if (this.api + 'register' === success.url) {
          setTimeout(() => {
            this.toastr.success('Welcome!');
          });
        }
        else if (this.api + 'products' === success.url && success.status === 201) {
          this.toastr.success('Product created!');
        }
        else if (this.api + 'categories' === success.url && success.status === 201) {
          this.toastr.success('New Category Added!');
        }
        else if (this.api + 'orders' === success.url && success.status === 200 && this.router.url.endsWith('cart')) {
          this.toastr.success('Your Order has been created!');
        }
        else if (success.url && success.url.endsWith('comments') && success.status === 200 && this.router.url.includes('product')) {
          this.toastr.success('Your comment has been added!');
        }
        else if (success.url && success.url.includes('products') && success.status === 204 && this.router.url.includes('edit')) {
          this.toastr.success('Product has been updated!');
        }
        else if (success.url && success.url.includes('orders') && success.url.endsWith('status')) {
          this.toastr.success('Order has been proceed!');
        }
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        if (error.error.errors) {
          error.error.errors.forEach(e => this.toastr.error(e.msg));
        }
        return throwError(error);
      })
    );
  }
}
