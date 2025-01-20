import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Page() {
    const { id } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${config.API.PAGES}/${id}`)
            .then(response => {
                setPage(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur : " + error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="page-container">
            <h1 className="page-title">{page.title.rendered}</h1>
            <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
    );
}

export default Page;
