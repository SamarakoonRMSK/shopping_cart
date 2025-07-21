import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { CartItemDetailed } from '../cart/cart.model';
import * as CartSelectors from '../cart/cart.selectors'
import * as CartActions from '../cart/cart.actions'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  private store = inject(Store);

  cartItem$ : Observable<CartItemDetailed[]>;
  totalPrice$ : Observable<number>;

  constructor(){
    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
  }

  increase(productId : string){
    this.store.dispatch(CartActions.increaseQuanity({productId}))
  }

  decrease(productId : string){
    this.store.dispatch(CartActions.descreaseQuanity({productId}))
  }

  remove(productId : string){
    this.store.dispatch(CartActions.removeItem({productId}))
  }

  clearCart(){
    if(confirm('Are you sure you want to clear the entire CART ??')){
      this.store.dispatch(CartActions.clearCart());
    }
  }


}
