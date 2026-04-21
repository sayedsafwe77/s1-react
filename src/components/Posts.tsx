import { useEffect, useState } from "react";
import type { Post, PostsProps } from "../types/basic";

function Posts({limit,skip,pageCount}: PostsProps){
    
    const [posts,setPosts] = useState<Post[]>([]);
    useEffect(()=>{
        fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}&select=title,body,tags,views`)
        .then(res => res.json())
        .then(data =>{
          setPosts(data.posts);
          pageCount(data);
        });
      },[skip,limit,pageCount]);
    return (
        <>
            <section className="posts">
                {posts.map(post => (
                    <div key={post.id} className="post">
                    <h3 className='post-title'>{post.title}</h3>
                    <p>{post.body}</p>
                    <ul>
                        {post?.tags?.map(tag => (
                        <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                    <span><b>Views: </b>{post?.views}</span>
                    </div>
                ))}
            </section>
        </>
    )
}
export default Posts;