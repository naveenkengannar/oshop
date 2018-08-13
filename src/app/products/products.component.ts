import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService) {

    this.productService
    .getAll()
    .switchMap(products => {
      this.products = products;
      return this.router.queryParamMap;
    }) 
    .subscribe(params => {
        this.category = params.get('category');
        (this.category) ? 
        this.filteredProducts = this.products.filter(p => p.category === this.category) :
        this.filteredProducts = this.products;
      });
   }
  ngOnInit() {
  }

}
