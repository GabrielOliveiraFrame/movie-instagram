import { Component, OnInit } from '@angular/core';
import { ActivatedUserService } from 'src/app/services/activated-user.service';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  users = ['superman', 'batman', 'wonderWoman'];

  activatedUser!: any;

  userPosts!: number;
  userLikes!: number;
  userComments!: number;

  constructor(
    private postsService: PostsService,
    private likesService: LikesService,
    private commentsService: CommentsService,
    private activatedUserService: ActivatedUserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo('superman');

    this.commentsService.createdComment.subscribe((data: any) =>{
      data ? this.userComments++ : '';
    })

    this.likesService.likeAcrement.subscribe((data: any) =>{
      if(data){
        this.userLikes++;
      } else {
        this.userLikes--;
      }
    })
  }

  getUserInfo(user: string){
    if(this.activatedUser != user){
      this.activatedUser = user;

      this.activatedUserService.setUser(user);

      this.postsService.getByUser(user).subscribe((data: any) => {
        this.userPosts = data.length;
      });

      this.commentsService.getByUser(user).subscribe((data: any) => {
        this.userComments = data.length;
      });

      this.likesService.getByUser(user).subscribe((data: any) => {
        this.userLikes = data.length;
      });
    }
  }


}
