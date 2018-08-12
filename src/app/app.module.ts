import { ProductService } from './product.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { componentFactoryName } from '@angular/compiler';
import { AuthService } from './auth.service';
import { AdminAuthguard } from './admin-authguard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '../../node_modules/@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';

@NgModule({
  declarations: [
    AppComponent,    
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,    
    DataTableModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'product', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthguard]
      },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthguard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthguard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthguard]
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthguard,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
