import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { SetSelectedProduct } from 'src/app/store/action/all-products.action';
import { AllProductsState } from 'src/app/store/state/all-products.state';

@Component({
  selector: 'app-selected-product',
  templateUrl: './selected-product.component.html',
  styleUrls: ['./selected-product.component.css'],
})
export class SelectedProductComponent implements OnInit, OnDestroy {
  selectedProductSub!: Subscription;
  id: any;
  @Select(AllProductsState.selectedProduct)
  selectedProduct$!: Observable<any>;
  products!: any;
  constructor(
    public productsService: ProductsService,
    public store: Store,
    public router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.id !== 0) {
      this.selectedProductSub.unsubscribe();
    } else {
      return;
    }
  }

  ngOnInit(): void {
    console.log(typeof localStorage.getItem('id'));
    this.id = localStorage.getItem('id');
    // this.id = this.productsService.getId();
    if (parseInt(this.id) === 0) {
      this.router.navigateByUrl('');
    } else {
      this.getProductById(parseInt(this.id));
    }
  }

  /* function for finding product information by id */
  getProductById(id: any): any {
    this.store.dispatch(new SetSelectedProduct(id));
    this.selectedProductSub = this.selectedProduct$.subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    });
  }
}
