import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  private baseURL : string = environment.baseURI;

  constructor(  public http: HttpClient ) { }

  saveData(data:any){

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('order', JSON.stringify(data.order));
    

    return this.http.post(`${this.baseURL}/upload`, formData);
  }

}
