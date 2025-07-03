
import "../css/SNosotros.css"

/* Usamos dos hooks, useState y useEffect */
import { useEffect, useState } from "react";

const Personajes = () => {

    const [personaje, setPersonaje] = useState([]);

    /* el useEffect es una  función quee maneja los efectos dentro del componente */
    /* Callback: una llamada previa antes de cargar el componente en el navegador */
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")/* httpRequest: ES5 / ES6 */
        .then(response => response.json())
        .then(response => setPersonaje(response.results))
        .catch(console.error())
    }, [])

    const imprimir = () => {
        console.log(personaje);
        
    }



    return (
        <main class="NMain">
            <div class="Tittle">
                <h1 class="TittleAnimation">About Us</h1>
            </div>
            <section class="AboutUs">
                <div class="AboutUsContent">
                    <h2>Our Mission</h2>
                    <p>At CLEAN SKIN, our mission is to provide high-quality, eco-friendly skincare products that enhance your natural beauty and contribute to a sustainable world. We believe in the power of nature and strive to use organic ingredients that are gentle on your skin and kind to the environment.</p>
                </div>
            </section>
            <button type="button" style={{width: "250px"}} onClick={imprimir}>
                Imprimir Datos
            </button>
        </main>
    )
}

export default Personajes;