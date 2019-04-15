import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
import IProduct from '../interfaces/IProduct';
import ICategory from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(category?: string): Observable<IProduct[]> {
    if (category) {
      return this.http.get<IProduct[]>(this.apiUrl + 'products', {params: {
        filter: category
      }});
    } else {
      return this.http.get<IProduct[]>(this.apiUrl + 'products');
    }
  }

  create(productData: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl + 'products', productData);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.apiUrl + 'products/' + id);
  }

  getProductWithCategories(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.apiUrl + 'products/' + id + '/categories');
  }

  editProduct(productData: IProduct, id: number): Observable<IProduct> {
    return this.http.put<IProduct>(this.apiUrl + 'products/' + id, productData);
  }

  getShoppingCartProducts(ids: Array<number>): Observable<IProduct[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('ids', ids.join(', '));
    return this.http.get<IProduct[]>(this.apiUrl + 'products/cart', {params: httpParams});
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl + 'categories');
  }

  deleteProduct(id: number) {
    return this.http.delete(this.apiUrl + 'products/' + id);
  }


}
