import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  [x: string]: any;
  get_all_products = 'https://fakestoreapi.com/products';
  get_single_product = 'https://fakestoreapi.com/products/';
  add_product = 'https://fakestoreapi.com/products';
  update_product = 'https://fakestoreapi.com/products/';
  delete_product = 'https://fakestoreapi.com/products/';
  prodID: number = 0;
  constructor(public http: HttpClient) {}

  /* get all products */
  getAllProducts() {
    return this.http.get(this.get_all_products);
  }

  /* get single product */
  getProduct(id: any) {
    return this.http.get(this.get_single_product + `${id}`);
  }

  /* add product */
  addProduct(data: any) {
    return this.http.post(this.add_product, { data: data });
  }

  /* update product */
  updateProduct(data: any) {
    return this.http.put(this.update_product + data.id, data);
  }

  /* delete product */
  deleteProduct(id: any) {
    return this.http.delete(this.delete_product + id);
  }

  /* set product id */
  setId(id: number) {
    this.prodID = id;
  }

  /* get product id */
  getId() {
    return this.prodID;
  }
}
