import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureEditComponent } from './picture-edit/picture-edit.component';

const routes: Routes = [
  { path: 'add/:id', component: PictureEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PictureRoutingModule {}