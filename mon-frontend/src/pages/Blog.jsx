import { useEffect, useState } from "react";
import axios from "axios";

function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://madebyqwerty.local/wp-json/wp/v2/posts")
            .then(response => setPosts(response.data))
            .catch(error => console.error("Erreur :", error));
    }, []);

    return (
        <div>
            <h1>Blog</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title.rendered}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blog;
