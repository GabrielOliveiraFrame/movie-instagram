import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentModel } from 'src/app/models/comment-model';
import { ActivatedUserService } from 'src/app/services/activated-user.service';
import { CommentsService } from 'src/app/services/comments.service';
import { v4 as uuid }  from 'uuid';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  postId!: any;

  comments!: any;

  commentModel = new CommentModel();

  form!: FormGroup;

  user = 'superman';

  constructor(
    private commentsService: CommentsService,
    private fb: FormBuilder,
    private activatedUserService: ActivatedUserService
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      comment: [null, Validators.required]
    })

    this.activatedUserService.activatedUser.subscribe((data: any) => {
      this.user = data.user;
    })

    this.commentsService.getByPostId(this.postId).subscribe((data: any) => {
      this.comments = data;
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.commentModel.comment = this.form.get('comment')?.value;
      this.commentModel.user = this.user;
      this.commentModel.postId = this.postId;
      this.commentModel.id = uuid();

      this.form.reset();

      this.commentsService.createComment(this.commentModel).subscribe((data: any) => {
        if(data){
          this.comments.push(data);
        }
      })
    }
  }

}
