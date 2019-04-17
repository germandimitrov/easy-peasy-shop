import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import ICategory from 'src/app/core/interfaces/ICategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  productSubscription: Subscription;
  categories: Array<ICategory>;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productSubscription = this.productService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
