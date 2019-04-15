import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import IProduct from 'src/app/core/interfaces/IProduct';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {
  form: FormGroup;
  product: IProduct;
  dropdownList: any;
  id: number;

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private categoryService: CategoryService,
    ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', Validators.required],
      categories: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]], // isNumber pattern
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getProductWithCategories(this.id).subscribe(product => {
        this.product = product;
        this.form.setValue({
          title: this.product.title,
          imageUrl: this.product.imageUrl,
          categories: this.product.categories,
          price: this.product.price,
          description: this.product.description,
        });
      });

      this.categoryService.get().pipe(
      ).subscribe(res => {
        this.dropdownList = res;
      });

    });
  }

  handleSubmit(f: NgForm) {
    this.productService.editProduct(this.form.value, this.id).subscribe(response => {
      this.product = response;
    });
  }

  get f() {
    return this.form.controls;
  }

}
