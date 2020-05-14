import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/shared/_services/contest/contest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contest } from 'src/app/shared/_model/Contest';
import { FileService } from 'src/app/shared/_services/file/file.service';

@Component({
  selector: 'app-contest-edit',
  templateUrl: './contest-edit.component.html',
  styleUrls: ['./contest-edit.component.scss']
})
export class ContestEditComponent implements OnInit {
  
  submitted: boolean = false;
  contestForm: FormGroup;
  contest: Contest;
  
  disabled = 'disabled';
  message: string;
  
  constructor(private cs: ContestService,
    private fs: FileService,
    private formBuilder: FormBuilder,
    private router: Router) {}
    
    ngOnInit(): void {
      this.initForm();
      
    }
    
    initForm(){
      this.contestForm = this.formBuilder.group({
        author: ['Arthur', Validators.required],
        title: ['Nature Auvergne', Validators.required],
        description: ['random'],
        deadline: ['2020-12-12', Validators.required],
        token: [this.tokenGenerator(24)]
      })
    }
    
    get f(){ return this.contestForm.controls; }
    
    onSubmit(){
      this.submitted = true;
      if(this.contestForm.invalid){
        return;
      }
      
      var formValues = this.contestForm.value;
      
      var contest = new Contest(formValues.title, formValues.description, formValues.author, formValues.token, formValues.deadline);
      console.log(contest);
      this.cs.save(contest, -1).subscribe(
        res => {
          this.cs.getByToken(formValues.token).subscribe( (res: Contest) => {
            console.log(res);
            this.contest = res;
          });
        })
      }
      
      tokenGenerator(length: number){
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        
        for(let i=0; i<length; i++){
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }
      
      goToSingle(token: string){
        this.router.navigate(['/contest/single/' + token]);
      }
      
      addPicture(){

        var pictures = document.getElementById('pictures');
        
        var newPictureArea = document.createElement('app-picture-edit');
        pictures.appendChild(newPictureArea);

        console.log(newPictureArea)
        /*
        newPictureArea.classList.add('col-md-4', 'form-group');
    
        //File
        var newFileFormGroup = document.createElement('div');
        newFileFormGroup.classList.add('form-group');
        newPictureArea.appendChild(newFileFormGroup);
    
        var newFileLabel = document.createElement('label');
        newFileLabel.classList.add('image-upload-container', 'btn', 'btn-bwn');
        newFileLabel.textContent = 'Sélectionnez un fichier image';
        newFileFormGroup.appendChild(newFileLabel);
    
        var newFileInput = document.createElement('input');
        newFileInput.className = 'form-control';
        newFileInput.setAttribute('type', 'file');
        newFileFormGroup.appendChild(newFileInput);
    
        //Photograph
        var newPhotoFormGroup = document.createElement('div');
        newPhotoFormGroup.classList.add('form-group');
        newPictureArea.appendChild(newPhotoFormGroup);
    
        var newPhotoLabel = document.createElement('label');
        newPhotoLabel.textContent = 'Photographe';
        newPhotoFormGroup.appendChild(newPhotoLabel);
    
        var newPhotoInput = document.createElement('input');
        newPhotoInput.className = 'form-control';
        newPhotoInput.setAttribute('type', 'text');
        newPhotoFormGroup.appendChild(newPhotoInput);
    
        //Comment
        var newCommentFormGroup = document.createElement('div');
        newCommentFormGroup.classList.add('form-group');
        newPictureArea.appendChild(newCommentFormGroup);
    
        var newCommentLabel = document.createElement('label');
        newCommentLabel.textContent = 'Commentaire';
        newCommentFormGroup.appendChild(newCommentLabel);
    
        var newCommentInput = document.createElement('textarea');
        newCommentInput.className = 'form-control';
        newCommentInput.setAttribute('type', 'text');
        newCommentFormGroup.appendChild(newCommentInput);

        //Button
        var submitButton = document.createElement('button');
        submitButton.className = 'btn btn-primary';
        submitButton.innerHTML = 'Soumettre';
        newPictureArea.appendChild(submitButton);*/
      }
    }
