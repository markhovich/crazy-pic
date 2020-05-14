import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/shared/_services/contest/contest.service';
import { Subscription } from 'rxjs';
import { Contest } from 'src/app/shared/_model/Contest';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.sass']
})
export class ContestListComponent implements OnInit {
  
  contests: Contest[];
  contestSub: Subscription;
  
  constructor(private cs: ContestService) { }
  
  ngOnInit(): void {
    this.contestSub = this.cs.getAll().subscribe( (res: Contest[]) => {
      this.contests = res;
    })
  }
  
}
