import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../_helpers/globals';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  FILE_API: string = this.global.URL_API + '/upload';

  constructor(private http: HttpClient,
              private global: Globals) { }

  getFile(id: number){
    let headers = new HttpHeaders({
      'Content-Type':  'image/jpeg',
      responseType : 'blob',
      Accept : 'image/jpeg',
      observe : 'response'
    })
    return this.http.get(this.global.URL_API + '/files/' + id, {
      headers: headers, responseType: 'blob' 
  });
  }

  upload(file: File, id: number){

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id.toString());

    return this.http.post(this.FILE_API, formData);
  }
}
