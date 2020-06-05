import { Component, OnInit, Input, Output } from '@angular/core';
import { PictureService } from 'src/app/shared/_services/picture/picture.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Contest } from 'src/app/shared/_model/Contest';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-picture-edit',
  templateUrl: './picture-edit.component.html',
  styleUrls: ['./picture-edit.component.scss']
})
export class PictureEditComponent implements OnInit {
  
  @Input() contest: Contest;
  
  submitted: boolean = false;
  success: boolean = false;

  pictureForm: FormGroup;
  selectedFile: File;
  @Output() valid = new EventEmitter<boolean>();
  
  message: string;
  nbPic: number = 0;

  constructor(private ps: PictureService,
    private formBuilder: FormBuilder) { }
    
    ngOnInit(): void {
      this.pictureForm = this.formBuilder.group({
        name: ' ',
        photograph: ' ',
        comment: ' ',
        image: ''
      })
      this.valid.emit(false);
    }
    
    get f(){ return this.pictureForm.controls; }
    
    selectFile(event){
      this.selectedFile = event.target.files[0];
      this.pictureForm.get('image').setValue(this.selectedFile);
    }
    
    onSubmit(){
      this.submitted = true;
      if(this.pictureForm.invalid){
        return;
      }
      var formValues = this.pictureForm.value;
      
      this.ps.save(this.pictureForm.get('image').value, this.contest.id, formValues.name, formValues.comment, formValues.photograph).subscribe(
        res => {  
          const form = document.getElementsByTagName('form');
          form[1].reset();
          this.success = true;
          this.valid.emit(true);
          this.nbPic++;
        },
        err => {
          console.log(err)
          this.success = false;
        }
        );
      }
      
    }
