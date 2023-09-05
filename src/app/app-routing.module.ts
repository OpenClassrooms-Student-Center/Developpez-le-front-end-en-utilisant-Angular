import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'error',
    loadChildren : () => import('./features/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'detail/:name',
    loadChildren : () => import('./features/detail/detail.module').then(m => m.DetailModule)
  },
  {
    path: '',
    loadChildren : () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    loadChildren : () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
