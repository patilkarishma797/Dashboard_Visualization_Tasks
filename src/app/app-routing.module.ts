import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutingModule } from './components/components-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/components.module').then(m => m.ComponentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ComponentsRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
