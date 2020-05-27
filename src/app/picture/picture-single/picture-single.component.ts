import { Component, OnInit, Input } from '@angular/core';
import { Picture } from 'src/app/shared/_model/Picture';
import { PictureService } from 'src/app/shared/_services/picture/picture.service';
import { FileService } from 'src/app/shared/_services/file/file.service';
import { Subscription, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-picture-single',
  templateUrl: './picture-single.component.html',
  styleUrls: ['./picture-single.component.scss']
})
export class PictureSingleComponent implements OnInit {

  @Input() token: string;
  @Input() picture: Picture;
  @Input() closed: boolean;
  @Input() index;

  cookie: string;
  imageToShow: any;
  counter: number = 0;
  voted: boolean = false;
  picUpload: Subscription;

  constructor(private ps: PictureService,
              private fs: FileService,
              private domSanitizer: DomSanitizer,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.picUpload = this.fs.getFile(this.picture.id).subscribe(
      res => {
        this.createImageFromBlob(res);
      }, err => {
        console.error(err);
      }
    );

    this.cookie = this.token + this.picture.id;

    if(this.cookieService.get(this.cookie)){
      this.voted = true;
    }
    console.log(this.index);

    const image = document.getElementById(this.index);
    image.addEventListener('click', () => {
    })
  }

  createImageFromBlob(image: Blob){
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
    
    this.imageToShow = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + reader.result);
    }

  upVote(id: number){
    this.picture.note++;
    this.voted = true;
    this.vote(id, 1);
  }

  downVote(id: number){
    this.picture.note--;
    this.voted = true;
    this.vote(id, -1);
  }

  vote(id: number, note: number){
    this.cookieService.set(this.cookie, 'voted');
    console.log(this.cookieService.get('voted'));

    this.ps.vote(id, note).subscribe( res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
  }
}
