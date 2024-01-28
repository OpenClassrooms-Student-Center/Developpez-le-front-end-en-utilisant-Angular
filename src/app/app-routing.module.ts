import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { IdExistsGuard } from './guards/id-exists.guard';

const routes: Routes = [
  { path: '',component: HomeComponent },
  { path: 'country-detail/:id', component: CountryDetailComponent, canActivate: [IdExistsGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
