import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/shared/_services/contest/contest.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Contest } from 'src/app/shared/_model/Contest';

@Component({
  selector: 'app-contest-single',
  templateUrl: './contest-single.component.html',
  styleUrls: ['./contest-single.component.scss']
})
export class ContestSingleComponent implements OnInit {

  contest : Contest;
  url: string = 'http://localhost:4200/contest/single/';
  contestSub: Subscription;
  closed: boolean = false;

  constructor(private cs: ContestService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contestSub = this.route.params.subscribe(params => {
      var token = params['token'];
      if(token){
        this.cs.getByToken(token).subscribe(
          (res: Contest) => {
            this.contest = res;
            this.url += token;
            this.closed = this.isClosed(this.contest.deadline);
            
            console.log(res);
          }
        )
      }
    })
  }

  isClosed(deadline): boolean{
    deadline = new Date(deadline);
    if(deadline.getTime() < new Date().getTime()){
      return true;
    }
    return false;
  }

}
