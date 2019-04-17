import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/core/services/category.service';
import ICategory from 'src/app/core/interfaces/ICategory';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {

  categorySubscription: Subscription;
  model: ICategory;
  category: ICategory;
  @Output() newCategoryAdded = new EventEmitter();

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  ngOnInit() {

  }

  handleSubmit(f: NgForm) {
    this.categorySubscription = this.categoryService.create(f.value).subscribe(response => {
      f.reset();
      // TOASTR
    });
  }

  // onBlurMethod() {
  //   this.categoryService.create(this.model).subscribe(response => {
  //     this.category = response;
  //     this.newCategoryAdded.emit(this.category);
  //   });
  // }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

}
