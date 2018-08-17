import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('showActions') showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }
  addToCart() {
    this.cartService.addTocart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
