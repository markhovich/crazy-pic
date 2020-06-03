import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/shared/_services/contest/contest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contest } from 'src/app/shared/_model/Contest';
import { FileService } from 'src/app/shared/_services/file/file.service';
import { dateValidator } from "src/app/shared/_helpers/date-validator";

@Component({
  selector: 'app-contest-edit',
  templateUrl: './contest-edit.component.html',
  styleUrls: ['./contest-edit.component.scss']
})
export class ContestEditComponent implements OnInit {
  
  submitted: boolean = false;
  buttonLabel: string = 'Suivant';
  
  contestForm: FormGroup;
  contest: Contest;
  valid: boolean = false;

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
        author: ['', Validators.required],
        title: ['', Validators.required],
        description: [''],
        deadline: ['', [Validators.required, dateValidator ]],
        token: [this.tokenGenerator(24)]
      })
    }
    
    onValid(event){
      this.valid = event;
    }

    get f(){ return this.contestForm.controls; }
    
    onSubmit(){
      this.submitted = true;
      if(this.contestForm.invalid){
        return;
      }
      this.buttonLabel = 'Modifier';

      var formValues = this.contestForm.value;

      let id;
      if(!this.contest){
        id = -1
      } else {
        id = this.contest.id;
      }    
      this.contest = new Contest(formValues.title, formValues.description, formValues.author, formValues.token, formValues.deadline);

      console.log(this.contest);
      this.cs.save(this.contest, id).subscribe(
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
        
      }
    }
