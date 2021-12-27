import { LikeModel } from './../models/like-model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  likeAcrement = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(environment.API_LIKES_URL);
  }

  getByPostId(id: string){
    return this.http.get(`${environment.API_LIKES_URL}?postId=${id}`);
  }

  getByUser(user: string){
    return this.http.get(`${environment.API_LIKES_URL}?user=${user}`);
  }

  getByPostIdAndUser(id: string, user: string){
    return this.http.get(`${environment.API_LIKES_URL}?postId=${id}&user=${user}`);
  }

  createLike(like: LikeModel){
    this.likeAcrement.emit(true);
    return this.http.post(environment.API_LIKES_URL, like);
  }

  deleteLike(id: string){
    this.likeAcrement.emit(false);
    return this.http.delete(`${environment.API_LIKES_URL}/${id}`);
  }
}
