import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-quantity-form',
  templateUrl: './quantity-form.component.html',
  styleUrls: ['./quantity-form.component.css']
})
export class QuantityFormComponent implements OnInit {

  @ViewChild('qtyForm') qtyForm: NgForm;
  quantity: number = 1;
  @Output() emitQuantity = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBlurMethod() {
    this.emitQuantity.emit(this.quantity);
  }
}
