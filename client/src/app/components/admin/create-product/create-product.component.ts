import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, NgZone, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import IProduct from 'src/app/core/interfaces/IProduct';
import { CategoryService } from 'src/app/core/services/category.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import ICategory from 'src/app/core/interfaces/ICategory';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  productSubscription: Subscription;
  categorySubscription: Subscription;
  product: IProduct;
  dropdownList: any;
  // @ViewChild('f') htmlFrom: NgForm;
  selectedItems = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
  };
  form: FormGroup;

  constructor(private productService: ProductsService, private categoryService: CategoryService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', Validators.required],
      categories: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]], // isNumber pattern
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.categorySubscription = this.categoryService.get().pipe(
      // map((res: any) => res.map((i: ICategory) => ( {item_id: i.id, item_text: i.name } )))
      // map((res: any) => res.map((i: ICategory) => ( {id: i.id, itemName: i.name } )))
    ).subscribe(res => {
      this.dropdownList = res;
    });
  }

  get f() {
    return this.form.controls;
  }

  displayNewCategory(category: ICategory) {
    this.dropdownList.push(category);
  }

  handleSubmit() {
    this.productSubscription = this.productService.create(this.form.value).subscribe(response => {
      this.product = response;
      this.form.reset();
    });
  }

  get invalid() {
    return this.form.invalid;
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

}
