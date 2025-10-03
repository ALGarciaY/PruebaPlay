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
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'addProduct', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'editProduct/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'pruebaModal', component: ModalSalesComponent, canActivate: [AuthGuard] },
  { path: 'buys', component: BuyListComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'editUser/:id', component: EditUserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
