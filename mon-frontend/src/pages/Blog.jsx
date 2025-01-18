import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Blog.css'; // Assurez-vous de créer ce fichier CSS

function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        axios.get("http://madebyqwerty.local/wp-json/wp/v2/posts")
            .then(response => {
                if (isMounted) {
                    setPosts(response.data);
                    setLoading(false);
                }
            })
            .catch(error => {
                if (isMounted) {
                    setError("Erreur : " + error.message);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="blog-container">
            <h1>Blog</h1>
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <h2 className="post-title">{post.title.rendered}</h2>
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blog;
