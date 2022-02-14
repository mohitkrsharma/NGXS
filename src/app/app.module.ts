import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { HttpClientModule } from '@angular/common/http';
import { AllProductsState } from './store/state/all-products.state';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectedProductComponent } from './components/selected-product/selected-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    SelectedProductComponent,
    UpdateProductComponent,
    AddProductComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AllProductsState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
