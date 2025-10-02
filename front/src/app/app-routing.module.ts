import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ModalSalesComponent } from './components/modal-sales/modal-sales.component';
import { LoginComponent } from './components/login/login.component';
import { BuyListComponent } from './components/buy-list/buy-list.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'editProduct/:id', component: EditProductComponent },
  { path: 'pruebaModal', component: ModalSalesComponent },
  { path: 'buys', component: BuyListComponent },
  { path: '', component: LoginComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
