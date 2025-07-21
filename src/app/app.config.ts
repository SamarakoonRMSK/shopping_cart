import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromProducts from './products/product.reducer';
import * as fromCart from './cart/cart.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';
import { provideHttpClient } from '@angular/common/http';
import { ProductEffects } from './products/product.effects';

const keysToSync = [fromCart.cartFeatureKey];

function localStorageSyncReducer(reducer:ActionReducer<any>): ActionReducer<any>{
  return localStorageSync({
    keys: keysToSync,
    rehydrate: true,
    storage: window.localStorage,
    removeOnUndefined: true
  })(reducer)
}

const metaReducers = [localStorageSyncReducer]

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({},{metaReducers}),
    provideState(fromProducts.productFeatureKey, fromProducts.productReducer),
    provideState(fromCart.cartFeatureKey, fromCart.cartReducer),
    provideRouter(routes),
    provideEffects([ProductEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
