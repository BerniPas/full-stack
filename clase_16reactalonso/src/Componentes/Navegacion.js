
import logo from "../images/items/ampoule/logocs.png";
import { Link } from "react-router-dom";

const Navegacion = () => {
    return (
        <header>
            <div class="logo">
                <img src={logo} alt="CLEAN SKIN"/>
            </div>
            <form class="search-form">
                <input type="text" placeholder="Search here..."/>
                    <button type="submit">Search</button>
            </form>
            <nav class="navbar">
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li><a href="contacto.html">Contacto</a></li>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="alta.html">Alta</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navegacion;