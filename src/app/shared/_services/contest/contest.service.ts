import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contest } from '../../_model/Contest';
import { Globals } from '../../_helpers/globals';
@Injectable({
  providedIn: 'root'
})
export class ContestService {

  CONTEST_API = this.global.URL_API + '/contests/';

  constructor(private http: HttpClient,
      private global: Globals) { 
    }

  getAll(){
    return this.http.get(this.CONTEST_API);
  }

  get(id: number){
    return this.http.get(this.CONTEST_API + id);
  }

  getOver(){
    return this.http.get(this.CONTEST_API + 'over');
  }

  getPending(){
    return this.http.get(this.CONTEST_API + 'pending')
  }

  getByToken(token: string){
    return this.http.get(this.global.URL_API + '/contest/' + token)
  }

  save(contest: Contest, id: number){
    console.log(contest)
    console.log(id)
    if(id>0){
      return this.http.put(this.CONTEST_API + id, contest);
    }
    return this.http.post(this.CONTEST_API, contest);
  }

  delete(id: number){
    return this.http.delete(this.CONTEST_API + id);
  }
}
