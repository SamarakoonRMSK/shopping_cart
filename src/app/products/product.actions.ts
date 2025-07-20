import { createAction, props } from "@ngrx/store";
import { Product } from "./product.model";

export const loadProduct = createAction(
  '[Products API] Load products'
);

export const loadProductSuccess = createAction(
   '[Products API] Load products Success',
   props<{products : Product[]}>()
);

export const loadProductFailure = createAction(
   '[Products API] Load products Failure',
   props<{error : any}>()
);