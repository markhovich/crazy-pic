import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../_helpers/globals';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  PICTURE_API = this.global.URL_API + '/pictures/';
  
  constructor(private http: HttpClient,
    private global: Globals) { }

  save(file: File, id: string, name: string, comment: string, photograph: string){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contestId', id);
    formData.append('name', name);
    formData.append('comment', comment);
    formData.append('photograph', photograph);

    return this.http.post(this.PICTURE_API, formData);
  }

  vote(id, note){
    return this.http.put(this.PICTURE_API + id, note);
  }
}
