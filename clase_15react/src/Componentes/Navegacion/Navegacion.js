import React from "react";


const nombre = "Pepe"

/* Creamos un componente con una función flecha */
const Navegacion = () => {
    /* retornamos UN SOLO elemento jsx */
    return(
        /* React Fragment para los dos */
        <React.Fragment>
            <header>
                <h1>
                    Mi app de React con { nombre }
                </h1>

            </header>
            <nav>
                <ul>
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li>
                        <a href="">Home</a>
                    </li>
                </ul>

            </nav>
        </React.Fragment>
    )
}

export default Navegacion