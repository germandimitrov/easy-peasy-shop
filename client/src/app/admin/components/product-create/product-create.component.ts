import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, NgZone, Input, Output, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import IProduct from 'src/app/interfaces/IProduct';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import ICategory from 'src/app/interfaces/ICategory';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

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
      price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]], // isNumber pattern
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.categoryService.get().pipe(
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


  // onItemSelect(category: any) {
  //   this.model.categories.push(category);
  // }

  handleSubmit() {
    this.productService.create(this.form.value).subscribe(response => {
      this.product = response;
      // this.model.categories = [];
      this.form.reset();
    });
  }

  get invalid() {
    return this.form.invalid;
  }

}
