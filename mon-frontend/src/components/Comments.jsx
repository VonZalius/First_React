import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Comments.css";

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://madebyqwerty.local/wp-json/wp/v2/comments?post=${postId}`)
            .then(response => {
                setComments(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur : " + error.message);
                setLoading(false);
            });
    }, [postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
            alert("Merci de remplir tous les champs !");
            return;
        }

        axios.post("http://madebyqwerty.local/wp-json/wp/v2/comments", {
            post: postId,
            content: newComment,
            author_name: authorName,
            author_email: authorEmail,
        }, {
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            setComments([...comments, response.data]);
            setNewComment("");
            setAuthorName("");
            setAuthorEmail("");
        }).catch(error => {
            alert("Erreur lors de l'envoi du commentaire !");
        });
    };

    return (
        <div className="comments-section">
            <h3>Commentaires</h3>
            {loading ? <p>Chargement...</p> : null}
            {error ? <p className="error">{error}</p> : null}
            <ul>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <li key={comment.id}>
                            <strong>{comment.author_name}</strong>: <span dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                        </li>
                    ))
                ) : (
                    <p>Aucun commentaire pour le moment.</p>
                )}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Votre nom"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Votre email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    required
                />
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Écrire un commentaire..."
                    required
                ></textarea>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default Comments;

