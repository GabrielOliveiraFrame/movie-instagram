import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts!: Observable<any>;

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.posts = this.postsService.getAll();
  }

}
