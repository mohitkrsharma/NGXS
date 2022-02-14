import { AllProductsState } from './../../store/state/all-products.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductsService } from 'src/app/services/products.service';
import {
  DeleteProduct,
  GetAllProducts,
} from 'src/app/store/action/all-products.action';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  prodID: number = 0;
  @Select(AllProductsState.getAllProducts)
  allProductsData$!: Observable<any>;

  @Select(AllProductsState.isProductListLoaded)
  isProductListLoaded$!: Observable<any>;
  productListLoadedSub!: Subscription;

  constructor(
    public productsService: ProductsService,
    public store: Store,
    public router: Router
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productListLoadedSub = this.isProductListLoaded$.subscribe(
      (loaded: any) => {
        if (!loaded) {
          this.store.dispatch(new GetAllProducts());
        }
      }
    );
  }

  /* function to show selected product information */
  showProduct(product_id: number) {
    this.prodID = product_id;
    localStorage.setItem('id', this.prodID.toString());
    this.productsService.setId(this.prodID);
    this.router.navigateByUrl('/selected-product');
  }

  /* function to show update product component */
  updateProduct(product_id: number) {
    this.prodID = product_id;
    this.productsService.setId(this.prodID);
    this.router.navigateByUrl('/update-product');
  }

  /* function to delete product */
  deleteProduct(product_id: number) {
    this.prodID = product_id;
    this.productsService.setId(this.prodID);
    this.store.dispatch(new DeleteProduct(this.prodID));
  }

  /* function to add product */
  addProduct() {
    console.log('add product clicked');
    this.router.navigateByUrl('/add-product');
  }
}
