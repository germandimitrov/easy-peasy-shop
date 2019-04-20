import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import IProduct from 'src/app/core/interfaces/IProduct';
import { ShoppingCartService } from 'src/app/core/services/shoppingCart.service';
import { Subscription } from 'rxjs';
import IComment from 'src/app/core/interfaces/IComment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  productSubscription: Subscription;
  id: number;
  product: IProduct;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const idKey = 'id';
      this.id = params[idKey];
      this.productSubscription = this.productService.getProduct(this.id).subscribe(product => this.product = product);
    });
  }

  getNewComment(comment: IComment) {
    this.product.comments.push(comment);
  }

  handleOrder(productId: number) {
    this.shoppingCartService.addToCart(productId);
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
