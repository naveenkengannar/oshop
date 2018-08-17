import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AdminAuthguard } from './services/admin-authguard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular5-data-table';
import { AuthGuard } from 'shared/services/auth-guard.service';

@NgModule({
  imports: [
        SharedModule,
    RouterModule.forChild([
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
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthguard
  ]
})
export class AdminModule { }
