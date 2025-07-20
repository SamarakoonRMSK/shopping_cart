import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProducts from './product.reducer';

export const selectProductState = createFeatureSelector<fromProducts.ProductState>(fromProducts.productFeatureKey);

export const selectAllProducts = createSelector(
selectProductState,
(state : fromProducts.ProductState) => state.products
);

export const selectProductsLoading = createSelector(
selectProductState,
(state : fromProducts.ProductState) => state.loading
);

export const selectProductsError = createSelector(
selectProductState,
(state : fromProducts.ProductState) => state.error
);

export const selectProductById = (productId : string) => createSelector(
  selectAllProducts,
  (products)=> products.find(p => p.id === productId)
)