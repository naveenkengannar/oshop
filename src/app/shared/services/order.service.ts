import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }
  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

}
