import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/shared/_services/contest/contest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.sass']
})
export class ContestListComponent implements OnInit {
  
  contests: any;
  contestSub: Subscription;
  
  constructor(private cs: ContestService) { }
  
  ngOnInit(): void {
    this.contestSub = this.cs.getAll().subscribe( res => {
      this.contests = res;
    })
  }
  
}
