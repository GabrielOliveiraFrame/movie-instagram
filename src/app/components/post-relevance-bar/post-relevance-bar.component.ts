import { Component, Input, OnInit } from '@angular/core';
import { LikeModel } from 'src/app/models/like-model';
import { ActivatedUserService } from 'src/app/services/activated-user.service';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';
import { v4 as uuid }  from 'uuid';

@Component({
  selector: 'app-post-relevance-bar',
  templateUrl: './post-relevance-bar.component.html',
  styleUrls: ['./post-relevance-bar.component.css']
})
export class PostRelevanceBarComponent implements OnInit {
  @Input()
  postId!: any;

  likes!: any;
  likesString!: any;
  likesLength!: any;
  commentsLength!: any;

  activatedUser = 'superman';

  liked = false;

  likeModel = new LikeModel();
  likeId!: any;

  constructor(
    private likesService: LikesService,
    private commentsService: CommentsService,
    private activatedUserService: ActivatedUserService
  ) { }

  ngOnInit(): void {
    this.activatedUserService.activatedUser.subscribe((data: any) => {
      if(data){
        this.activatedUser = data.user;

        let tempLength = 0;

        this.likes.map((user: any) => {
          if(user == this.activatedUser){
            tempLength++;
            this.likesService.getByPostIdAndUser(this.postId, user).subscribe((data: any) => {
              this.likeId = data[0].id;
            });
          }
        });

        tempLength > 0 ? this.liked = true : this.liked = false;
      }
    });

    this.getLikes(this.postId);

    this.commentsService.getByPostId(this.postId).subscribe((data: any) => {
      this.commentsLength = data.length;
    });

    this.commentsService.createdComment.subscribe((data: any) => {
      data ? this.commentsLength++ : '';
    })
  }

  getLikes(postId: string){
    this.likesService.getByPostId(postId).subscribe((data: any) => {
      this.likes = data.map((like: any) => {
        if(like.user == this.activatedUser){
          this.liked = true;
          this.likeId = like.id;
        }
        return like.user;
      });

      this.likesLength = this.likes.length;
      this.likesString = this.likes.join(', ');
    });
  }

  createLike(){
    this.likeModel.postId = this.postId;
    this.likeModel.user = this.activatedUser;
    this.likeModel.id = uuid();

    this.likesService.createLike(this.likeModel).subscribe((data: any) => {
      this.likesLength++;
      this.likes.push(data.user);
      this.likesString = this.likes.join(', ');
      this.likeId = data.id;
      this.liked = true;
    })
  }

  removeLike(){
    this.likesService.deleteLike(this.likeId).subscribe();
    this.liked = false;
    this.likesLength--;

    const userIndex = this.likes.indexOf(this.activatedUser);
    this.likes.splice(userIndex, 1);

    this.likesString = this.likes.join(', ');
  }

}
