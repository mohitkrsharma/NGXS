import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import {
  SetSelectedProduct,
  UpdateProduct,
} from 'src/app/store/action/all-products.action';
import { AllProductsState } from 'src/app/store/state/all-products.state';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  id = 0;
  img_url = '';
  title = '';
  description = '';
  price = 0;
  category = '';
  rate = 0;
  count = 0;
  selectedProductSub!: Subscription;
  @Select(AllProductsState.selectedProduct)
  selectedProduct$!: Observable<any>;
  products!: any;
  constructor(
    public productsService: ProductsService,
    public store: Store,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.productsService.getId();
    if (this.id === 0) {
      // return;
      this.router.navigateByUrl('');
    } else {
      this.getProductById(this.id);
    }
  }

  /* function for finding product information by id */
  getProductById(id: any): any {
    this.store.dispatch(new SetSelectedProduct(id));
    this.selectedProductSub = this.selectedProduct$.subscribe((res: any) => {
      this.products = res;
      this.title = this.products.title;
      this.img_url = this.products.image;
      this.description = this.products.description;
      this.price = this.products.price;
      this.category = this.products.category;
      this.rate = this.products.rating.rate;
      this.count = this.products.rating.count;
    });
  }

  /* update button function */
  updateProduct() {
    const data = {
      id: this.id,
      image: this.img_url,
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      rate: this.rate,
      count: this.count,
    };
    console.log(data);
    this.store.dispatch(new UpdateProduct(data));
  }
}
