import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ModalSalesComponent } from './components/buy/modal-sales/modal-sales.component';
import { LoginComponent } from './components/user/login/login.component';
import { BuyListComponent } from './components/buy/buy-list/buy-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'editProduct/:id', component: EditProductComponent },
  { path: 'pruebaModal', component: ModalSalesComponent },
  { path: 'buys', component: BuyListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'editUser/:id', component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
