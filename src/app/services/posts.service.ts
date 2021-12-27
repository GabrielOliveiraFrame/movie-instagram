import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(environment.API_POSTS_URL);
  }

  getByUser(user: string){
    return this.http.get(`${environment.API_POSTS_URL}?user=${user}`);
  }
}
