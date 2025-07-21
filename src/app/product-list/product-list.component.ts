import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../products/product.model';
import * as ProductSelectors from '../products/product.selectors';
import * as ProductActions from '../products/product.actions';
import * as CartActions from '../cart/cart.actions';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private store = inject(Store);

  products$: Observable<Product[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any | null>;

  constructor(){
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductSelectors.selectProductsError);
  }
  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProduct());
  }

  addToCart(productId: string){
    this.store.dispatch(CartActions.addItem({productId}));
  }
}
