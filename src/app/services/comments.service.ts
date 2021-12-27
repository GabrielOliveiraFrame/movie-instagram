import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentModel } from '../models/comment-model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  createdComment = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(environment.API_COMMENTS_URL);
  }

  getByPostId(id: any){
    return this.http.get(`${environment.API_COMMENTS_URL}?postId=${id}`);
  }

  getByUser(user: string){
    return this.http.get(`${environment.API_COMMENTS_URL}?user=${user}`);
  }

  createComment(comment: CommentModel){
    this.createdComment.emit(true);
    return this.http.post(environment.API_COMMENTS_URL, comment);
  }
}
