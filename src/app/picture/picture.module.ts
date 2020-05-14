import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PictureEditComponent } from './picture-edit/picture-edit.component';
import { PictureRoutingModule } from './picture.routing';
import { PictureSingleComponent } from './picture-single/picture-single.component';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [PictureEditComponent, PictureSingleComponent],
  imports: [
    CommonModule,
    PictureRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  exports: [PictureEditComponent, PictureSingleComponent]
})
export class PictureModule { }
