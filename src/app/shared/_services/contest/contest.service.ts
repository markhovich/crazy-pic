import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  URL_API = 'http://localhost:9090';
  CONTEST_API = this.URL_API + '/contests';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.CONTEST_API);
  }
}
