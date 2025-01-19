import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Blog.css"; 
import LikeButton from "../components/LikeButton";

function Blog() {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        axios.get("http://madebyqwerty.local/wp-json/wp/v2/posts?_embed")
            .then(response => {
                if (isMounted) {
                    setBlog(response.data); // Correction ici
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

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="blog-container">
            <h1>Blog</h1>
            <ul className="blog-list">
                {blog.map(post => { // Utilisation correcte de blog.map
                    const firstParagraph = post.content.rendered.match(/<p>(.*?)<\/p>/);
                    const previewText = firstParagraph ? firstParagraph[0] : "Lire la suite...";
                    
                    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

                    return (
                        <li key={post.id} className="blog-item">
                            {featuredImage && (
                                <img src={featuredImage} alt={post.title.rendered} className="blog-image" />
                            )}

                            <h2 className="blog-title">
                                <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
                            </h2>
                            <div className="blog-preview" dangerouslySetInnerHTML={{ __html: previewText }} />
                            <LikeButton postId={post.id} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Blog;


