import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {
    path: '',
    component: AddInventoryComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
