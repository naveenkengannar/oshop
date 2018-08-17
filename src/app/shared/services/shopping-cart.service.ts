import { async } from 'rxjs/scheduler/async';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from '../../../../node_modules/rxjs';
@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .map(x => new ShoppingCart(x.items));
  }

  async addTocart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

async clearCart () {
  const cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
}


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId() {

    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private async updateItem(product: Product, change: number){
    const cartId = await this.getOrCreateCartId();

    const item$ = this.getItem(cartId, product.$key);

    item$.take(1).subscribe(item => {
      const quantity = (item.quantity || 0) + change;

      if ( quantity === 0) {
        item$.remove();
      } else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity });
      }
      }
  );
  }
}
