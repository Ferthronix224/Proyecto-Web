import { Post } from "./post.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostService{
  private posts: Post[] = [];// primera matriz
  private postsUpdate = new Subject<Post[]>();

  constructor (private http: HttpClient, private router: Router){}

  getPosts(){
    //return [...this.posts]// segunda matriz (copia)
    this.http.get<{message:string, posts: any}>('http://localhost:3000/api.posts')
    .pipe(map((postData => {
      return postData.posts.map(post =>{
        return{
        id: post._id,
        name: post.name,
        hair: post.hair,
        eyes: post.eyes,
        age: post.age,
        power: post.power,
        genre: post.genre,
        imagePath: post.imagePath
      }
      })
    })))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts
      this.postsUpdate.next([...this.posts])
    })
  }

  getPostsUpdateListener(){
    return this.postsUpdate.asObservable()
  }

  getPost(id: string){
    //return {...this.posts.find( p => p.id === id)}
    return this.http.get<{_id: string, name: string, hair: string, eyes:string, age:string, power: string, genre: string, imagePath: string}>
    ('http://localhost:3000/api.posts/' + id)
  }

  addPost(name: string, hair: string, eyes:string, age:string, power: string, genre: string, image: File){
    const postData = new FormData()
    postData.append('name', name)
    postData.append('hair', hair)
    postData.append('eyes', eyes)
    postData.append('age', age)
    postData.append('power', power)
    postData.append('genre', genre)
    postData.append('image', image, name)
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api.posts', postData)
    .subscribe((responseData) => {
      const post: Post={
        id: responseData.post.id,
        name: name,
        hair: hair,
        eyes: eyes,
        age: age,
        power: power,
        genre: genre,
        imagePath: responseData.post.imagePath}
      this.posts.push(post)
      this.postsUpdate.next([...this.posts])
      this.router.navigate(['/list'])
    })
    }

  updatePost(id: string, name: string, hair: string, eyes: string, age: string, power:  string, genre: string, image: File | string){
    let postData: Post | FormData
    if(typeof image === "object"){
      postData = new FormData()
      postData.append("id", id)
      postData.append('name', name)
      postData.append('hair', hair)
      postData.append('eyes', eyes)
      postData.append('age', age)
      postData.append('power', power)
      postData.append('genre', genre)
      postData.append("image", image, name)
     }
    this.http.put("http://localhost:3000/api.posts/" + id, postData)
    .subscribe(response => {
      const updatePost = [...this.posts]
      const oldPostIndex = updatePost.findIndex(p => p.id === id)
      const post: Post = {
        id: id,
        name: name,
        hair: hair,
        eyes: eyes,
        age: age,
        power: power,
        genre: genre,
        imagePath: ""
      }
      updatePost[oldPostIndex] = post
      this.posts = updatePost
      this.postsUpdate.next([...this.posts])
      this.router.navigate(['/list'])
    })
  }

  deletePost(id: string){
    this.http.delete<{message: string}>('http://localhost:3000/api.posts/' + id)
    .subscribe(() => {
      const updatePosts = this.posts.filter(post => post.id != id)
      this.posts = updatePosts
      this.postsUpdate.next([...this.posts])
    })
  }
}
