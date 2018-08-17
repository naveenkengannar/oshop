import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart$: Observable<ShoppingCart>;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {

   }
  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {

    this.productService
    .getAll()
    .switchMap(products => {
      this.products = products;
      return this.router.queryParamMap;
    })
    .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }
  private applyFilter() {
    (this.category) ?
    this.filteredProducts = this.products.filter(p => p.category === this.category) :
    this.filteredProducts = this.products;
  }
}
