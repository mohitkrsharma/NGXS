import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SelectedProductComponent } from './components/selected-product/selected-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  { path: 'selected-product', component: SelectedProductComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'add-product', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
