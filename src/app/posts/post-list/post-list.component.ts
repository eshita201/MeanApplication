import { Component,OnInit,Input } from '@angular/core';
import { Post } from '../posts.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent 
implements OnInit,OnDestroy {
  
posts : Post[] = [];
 private postssSub: Subscription;
 isLoading = false;
  totalposts = 0;
  postsPerPage = 2;
  currentPage=1;
  pageSizeOptions = [1,2,5,10];
 constructor(public postsService: PostsService) { 
}

ngOnInit() {
  this.isLoading = true;
  this.postsService.getPosts(this.postsPerPage,this.currentPage);
  this.postssSub = this.postsService.getPostUpdatedListener().
  subscribe((postData: {posts: Post[], postCount: number})=>{
    this.isLoading = false;
    this.totalposts =postData.postCount;
    this.posts = postData.posts;
  });
}

onChangedPage(pageData: PageEvent){
this.currentPage = pageData.pageIndex + 1 ;
this.postsPerPage = pageData.pageSize;
this.postsService.getPosts(this.postsPerPage,this.currentPage);
}


onDelete(postId: string){
  this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
}

ngOnDestroy() {
    this.postssSub.unsubscribe()
}

}
