import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Observable, Subscription } from 'rxjs';
import IProduct from 'src/app/core/interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {

  productSubscription: Subscription;
  products$: Observable<IProduct[]>;

  constructor(private productService: ProductsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.products$ = this.productService.get();
  }

  deleteProduct(productId: number) {
    this.productSubscription = this.productService.deleteProduct(productId).subscribe(response => {
      this.products$ = this.productService.get();
      this.toastr.success('Product has been Deleted!');
    }) ;
  }

  ngOnDestroy() {

    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

  }

}
