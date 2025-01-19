import { useState, useEffect } from "react";
import "./css/LikeButton.css"; // Assurez-vous que ce fichier existe

function LikeButton({ postId }) {
    // Charger l’état du "Like" depuis localStorage avec une clé unique
    const localStorageKey = `liked_post_${postId}`;
    const storedLike = localStorage.getItem(localStorageKey) === "true";
    const [liked, setLiked] = useState(storedLike);

    // Mettre à jour localStorage lorsqu'on clique sur le bouton
    const toggleLike = () => {
        const newLikedState = !liked;
        setLiked(newLikedState);
        localStorage.setItem(localStorageKey, newLikedState); // Sauvegarde dans localStorage avec une clé unique
    };

    return (
        <div className="like-button">
            <span 
                className={`heart ${liked ? "liked" : ""}`}  
                onClick={toggleLike} 
            >
                {liked ? "❤️" : "🤍"}
            </span>
        </div>
    );
}

export default LikeButton;





