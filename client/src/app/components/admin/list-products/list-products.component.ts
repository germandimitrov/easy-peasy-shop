import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Observable } from 'rxjs';
import IProduct from 'src/app/core/interfaces/IProduct';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products$: Observable<IProduct[]>;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productService.get();
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(response => {
      console.log(response);
      this.products$ = this.productService.get();
    }) ;
  }

}
