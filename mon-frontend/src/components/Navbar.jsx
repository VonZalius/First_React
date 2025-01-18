import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/blog">Blog</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
