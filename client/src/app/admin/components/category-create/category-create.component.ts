import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import ICategory from 'src/app/interfaces/ICategory';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  model: ICategory;
  category: ICategory;
  @Output() newCategoryAdded = new EventEmitter();

  constructor(private http: HttpClient, private categoryService: CategoryService) {
    this.model = { name: '' };
  }

  ngOnInit() {

  }

  onBlurMethod() {
    this.categoryService.create(this.model).subscribe(response => {
      this.category = response;
      this.newCategoryAdded.emit(this.category);
    });
  }

}
