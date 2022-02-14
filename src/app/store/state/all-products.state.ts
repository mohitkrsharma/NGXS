import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import {
  AddProduct,
  DeleteProduct,
  GetAllProducts,
  SetSelectedProduct,
  UpdateProduct,
} from '../action/all-products.action';

/* state model */
export class AllProductsStateModel {
  allProducts!: any[];
  allProductsLoaded!: boolean;
  setSelectedProduct!: string;
}

/* state decorator */
@State<AllProductsStateModel>({
  name: 'allproducts',
  defaults: {
    allProducts: [],
    allProductsLoaded: false,
    setSelectedProduct: '',
  },
})
/* state class */
@Injectable()
export class AllProductsState {
  constructor(public productsService: ProductsService) {}

  /* Selector has logic to get state data */
  /* Get products list from state */
  @Selector()
  static getAllProducts(state: AllProductsStateModel) {
    return state.allProducts;
  }

  /* check all products loaded info */
  @Selector()
  static isProductListLoaded(state: AllProductsStateModel) {
    return state.allProductsLoaded;
  }

  /* get selected product by id from state */
  @Selector()
  static selectedProduct(state: AllProductsStateModel) {
    return state.setSelectedProduct;
  }
  /* get products action logic */
  /* this action gets executed from all-employee.component line --> this.store.dispatch(new GetAllProducts());  */
  @Action(GetAllProducts)
  getProducts({ getState, setState }: StateContext<AllProductsStateModel>) {
    console.log('State Action');
    return this.productsService.getAllProducts().pipe(
      tap((res: any) => {
        const state = getState();
        setState({
          ...state,
          allProducts: res,
          allProductsLoaded: true,
        });
      })
    );
  }

  /* set selected product action */
  @Action(SetSelectedProduct)
  setSelectedProduct(
    { getState, setState }: StateContext<AllProductsStateModel>,
    { id }: SetSelectedProduct
  ): any {
    console.log(id);
    const state = getState();
    const productList = state.allProducts;
    const index = productList.findIndex((p) => p.id === id);
    console.log(productList);
    console.log(productList.length > 0);
    if (productList.length > 0) {
      setState({
        ...state,
        setSelectedProduct: productList[index],
      });
    } else {
      return this.productsService.getProduct(id).pipe(
        tap((response: any) => {
          console.log(response);
          const state = getState();
          const productList = [response];
          setState({
            ...state,
            setSelectedProduct: productList[0],
          });
        })
      );
    }
  }

  /* WE DO NOT NEED SELECTOR FOR UPDATE INSTEAD WE CAN DIRECTLY WORK ON ACTION */
  /* update product action */
  @Action(UpdateProduct)
  updateProduct(
    { getState, patchState }: StateContext<AllProductsStateModel>,
    { payload }: UpdateProduct
  ) {
    return this.productsService.updateProduct(payload).pipe(
      tap((response: any) => {
        const state = getState();
        const productList = state.allProducts;
        const index = productList.findIndex((p) => p.id === payload.id);
        productList[index] = response;
        patchState({
          allProducts: productList,
        });
      })
    );
  }

  /* WE DO NOT NEED SELECTOR FOR UPDATE INSTEAD WE CAN DIRECTLY WORK ON ACTION */
  /* delete product action */
  @Action(DeleteProduct)
  deleteProduct(
    { getState, setState }: StateContext<AllProductsStateModel>,
    { id }: DeleteProduct
  ) {
    /* deleting data from both state/api */
    return this.productsService.deleteProduct(id).pipe(
      tap((response: any) => {
        const state = getState();
        const filteredProducts = state.allProducts.filter(
          (prod) => prod.id !== id
        );
        setState({
          ...state,
          allProducts: filteredProducts,
        });
      })
    );
  }

  /* add product action */
  @Action(AddProduct)
  addProduct(
    { getState, patchState }: StateContext<AllProductsStateModel>,
    { payload }: AddProduct
  ) {
    console.log(payload);
    return this.productsService.addProduct(payload).pipe(
      tap((response: any) => {
        const state = getState();
        patchState({
          allProducts: [...state.allProducts, response],
        });
      })
    );
  }
}
