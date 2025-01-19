import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Page from "./pages/Page";

function App() {
    const [siteTitle, setSiteTitle] = useState("");
    const [siteTagline, setSiteTagline] = useState("");
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        axios.get("http://madebyqwerty.local/wp-json/custom/v1/settings")
            .then(response => {
                setSiteTitle(response.data.title);
                setSiteTagline(response.data.description);
                setLogo(response.data.logo);
            })
            .catch(error => console.error("Erreur API settings :", error));
    }, []);

    return (
        <Router>
            <header className="site-header">
                {logo && <img src={logo} alt="Logo du site" className="site-logo" />}
                <div>
                    <h1>{siteTitle}</h1>
                    <p>{siteTagline}</p>
                </div>
            </header>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/page/:id" element={<Page />} />
            </Routes>
        </Router>
    );
}

export default App;





