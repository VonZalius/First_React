import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get("http://madebyqwerty.local/wp-json/custom/v1/menus")
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

