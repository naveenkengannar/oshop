import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {

    // tslint:disable-next-line:no-input-rename
    @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  orderSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }
 

  ngOnInit() {
    this.orderSubscription = this.authService.user$.subscribe( user => this.userId = user.uid);
  }

  async placeOrder() {

    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
   }

   ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

}
