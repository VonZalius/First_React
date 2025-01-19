import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/Post.css"; 
import Comments from "../components/Comments";
import LikeButton from "../components/LikeButton";
import { Link } from "react-router-dom";


function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://madebyqwerty.local/wp-json/wp/v2/posts/${id}?_embed`) // Ajout de _embed pour récupérer l'image
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur : " + error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    // Récupération de l'image mise en avant
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    return (
        <div className="post-container">
            <h1 className="post-title">{post.title.rendered}</h1>

            {/* Affiche l'image seulement si elle existe */}
            {featuredImage && (
                <img src={featuredImage} alt={post.title.rendered} className="post-image" />
            )}

            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            <LikeButton postId={id} />
            <Comments postId={id} />
            <Link to="/blog" className="back-to-blog">← Retour au blog</Link>
        </div>
    );
}

export default Post;

