import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/shared/_services/contest/contest.service';
import { Subscription } from 'rxjs';
import { Contest } from 'src/app/shared/_model/Contest';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  
  contests: Contest[];
  contestSub: Subscription;
  image: string;
  state: string = 'all';
  nbContests: number;

  constructor(private cs: ContestService) { }
  
  ngOnInit(): void {
    this.contestSub = this.cs.getAll().subscribe( (res: Contest[]) => {
      this.contests = res;
      this.nbContests = this.contests.length;
      this.image = './assets/sancy.jpg';
    })
  }
  
  onSubmit(f: NgForm){

    let firstLetter = this.state[0].toUpperCase();
    const req = 'get' + firstLetter + this.state.substr(1);
    console.log(req);

    switch(this.state){
      case 'all':
        this.contestSub = this.cs.getAll().subscribe( (res: Contest[]) => {
          this.contests = res;
          this.nbContests = this.contests.length;
        })
        break;
      case 'over':
        this.contestSub = this.cs.getOver().subscribe( (res: Contest[]) => {
          this.contests = res;
          this.nbContests = this.contests.length;
        })
        break;
      case 'pending':
        this.contestSub = this.cs.getPending().subscribe( (res: Contest[]) => {
          this.contests = res;
          this.nbContests = this.contests.length;
        })
        break;
    }
  }
}
