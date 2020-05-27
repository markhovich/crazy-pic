import { Component, OnInit, Input } from '@angular/core';
import { PictureService } from 'src/app/shared/_services/picture/picture.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Contest } from 'src/app/shared/_model/Contest';

@Component({
  selector: 'app-picture-edit',
  templateUrl: './picture-edit.component.html',
  styleUrls: ['./picture-edit.component.scss']
})
export class PictureEditComponent implements OnInit {
  
  @Input() contest: Contest;
  
  submitted: boolean = false;
  pictureForm: FormGroup;
  selectedFile: File;
  message: string;
  
  constructor(private ps: PictureService,
    private formBuilder: FormBuilder,
    private router: Router) { }
    
    ngOnInit(): void {
      console.log(this.contest);
      this.pictureForm = this.formBuilder.group({
        name: '',
        photograph: '',
        comment: '',
        image: ''
      })
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
        event => {
          console.log('success');
          
          if(event instanceof HttpResponse){
            this.message = event.body.message;
            console.log(this.message);
          }
          
          const form = document.getElementsByTagName('form');
          form[1].reset();
          //this.goToSingle();
        },
        err => {
          this.message = 'L\'image n\'a pas été chargée correctement';
          console.log(err)
        }
        );
      }
      
      goToSingle(){
        this.router.navigate(['/contest/single/' + this.contest.token])
      }
    }
