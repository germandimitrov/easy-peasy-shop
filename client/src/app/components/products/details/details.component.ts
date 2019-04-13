import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import IProduct from 'src/app/core/interfaces/IProduct';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: number;
  product: IProduct;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const idKey = 'id';
      this.id = params[idKey];
      this.productService.getProduct(this.id).subscribe(product => this.product = product);
    });
  }

  getNewComment(comment) {
    this.product.comments.push(comment);
  }

}
