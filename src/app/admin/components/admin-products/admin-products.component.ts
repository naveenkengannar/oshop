import { Product } from 'shared/models/product';
import { Subscription } from 'rxjs/Rx';
import { filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { identifierModuleUrl } from '../../../../../node_modules/@angular/compiler';
import { DataTableResource } from '../../../../../node_modules/angular5-data-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
products: Product[];
items: Product[]=[];
subscription: Subscription;
tableResource: DataTableResource<Product>;
itemCount:number;

  constructor(
    private productService: ProductService
  ) {
      this.subscription = productService.getAll().subscribe(p => 
        {
          this.products = p;
          this.initializeTable(p);         
        });
   }

   private initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0})
    .then(items => this.items = items);
    this.tableResource.count()
    .then(count => this.itemCount = count);
   }

   reloadItems(params){
     if(!this.tableResource) return;

     this.tableResource.query(params)
     .then(items => this.items = items);

   }

filter (query: string) {
 let filteredProducts = query ?
 this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
 this.products;
 
 this.initializeTable(filteredProducts);
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
  ngOnInit() {
  }

}
