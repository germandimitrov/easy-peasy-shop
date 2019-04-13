import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import ICategory from 'src/app/interfaces/ICategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Array<ICategory>;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
  }

}
