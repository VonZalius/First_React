import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Navbar() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get(`${config.API.MENUS}`)
            .then(response => setMenuItems(response.data))
            .catch(error => console.error("Erreur menu :", error));
    }, []);

    return (
        <nav>
            <ul>
                {menuItems.length > 0 ? (
                    menuItems.map(item => (
                        <li key={item.id}>
                            <Link to={item.url}>{item.title}</Link>
                        </li>
                    ))
                ) : (
                    <li>Chargement du menu...</li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;

