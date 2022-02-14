import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/store/action/all-products.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm = new FormGroup({});
  constructor(public store: Store) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      category: new FormControl(),
      description: new FormControl(),
      productID: new FormControl(),
      image: new FormControl(),
      price: new FormControl(),
      rate: new FormControl(),
      count: new FormControl(),
      title: new FormControl(),
    });
  }

  /* on submitting the form function */
  onSubmit() {
    const data = {
      category: this.productForm.value.category,
      description: this.productForm.value.description,
      // id: parseInt(this.productForm.value.productID),
      image: this.productForm.value.image,
      price: parseInt(this.productForm.value.price),
      // rating: {
      //   rate: parseInt(this.productForm.value.rate),
      //   count: parseInt(this.productForm.value.count),
      // },
      title: this.productForm.value.title,
    };
    // console.log(this.productForm.value);
    // console.log(data);
    this.store.dispatch(new AddProduct(data));
  }
}
