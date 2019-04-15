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
            this.toastr.success('Success');
          });
        } else if (this.api + 'products' === success.url && success.status === 201) {
          setTimeout(() => {
            this.toastr.success('Product created!');
          });
        } else if (this.api + 'categories' === success.url && success.status === 201) {
          this.toastr.success('New Category Added!');
        }
        console.log(success);
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
