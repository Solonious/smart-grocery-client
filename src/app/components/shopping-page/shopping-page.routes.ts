import { Routes } from '@angular/router';

export const SHOPPING_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./shopping-page.component').then(m => m.ShoppingPageComponent),
        children: [
            {
                path: '',
                redirectTo: 'select-store',
                pathMatch: 'full'
              },
              {
                path: 'select-store',
                loadComponent: () =>
                  import('../select-store/select-store.component').then(m => m.SelectStoreComponent)
              },
              {
                path: 'select-product',
                loadComponent: () =>
                  import('../select-product/select-product.component').then(m => m.SelectProductComponent)
              },
            //   {
            //     path: 'cart',
            //     loadComponent: () =>
            //       import('./cart/cart.page').then(m => m.CartPage)
            //   },
            //   {
            //     path: 'checkout',
            //     loadComponent: () =>
            //       import('./checkout/checkout.page').then(m => m.CheckoutPage)
            //   }
        ]
    }
];
