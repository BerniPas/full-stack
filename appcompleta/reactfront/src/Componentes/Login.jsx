
import "../css/SContacto.css"
import axios from "axios"
import Swal from "sweetalert2";

import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {

        e.preventDefault();

        if(email === "" || password === ""){
            alert("Todos los campos son obligatorios")
            return
        }

        try{

            const respuesta = await axios.post('/user', {
                    email,
                    password
                })


        }catch{

        Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Estamos resolviendo los problemas!",
                /* footer: '<a href="#">Why do I have this issue?</a>' */
                });
            
            limpiarDatos()

        }

    }

    const limpiarDatos = () =>{
        setEmail(""),
        setPassword("")
    }















    return (
        <main className="CMain">
            <div className="Tittle">
                <h1 className="TittleAnimation">LOGIN</h1>
            </div>

            <div className="Contact">
                <form onSubmit={ loginUser }>
                    <div class="ContactForm">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value)}
                            placeholder="Email" 
                            required 
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                            title="Please, enter a valid email adress."/>
                    </div>
                    <div class="ContactForm">
                        <input 
                            type="password" 
                            id="passsword" 
                            name="passsword"
                            value={ password }
                            onChange={(e) => { setPassword(e.target.value) }}
                            placeholder="passsword" 
                            required
                            title="Password."/>
                    </div>

                    <div>
                        <button type="submit" style={{ marginRight: "15px" }}>
                            Send
                        </button>
                        <button type="reset">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login