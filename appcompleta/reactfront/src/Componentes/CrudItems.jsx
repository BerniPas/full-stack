
import { useState, useEffect } from 'react';
import axios from 'axios';


const CrudItems = () => {
    const [items, setItems] = useState([]); // para el GET, lo usamos en el map
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [editId, setEditId] = useState(null); // para el PUT y DELETE

    // Función para obtener los items - GET
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:9000/items');
            setItems(response.data);
            console.log('Items obtenidos:', response.data);
        } catch (error) {
            console.error('Error al obtener los items:', error);
        }
    };

    // useEffect para cargar los items al montar el componente
    useEffect(() => {
        fetchItems();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
    }


    return (
        <div className='container mt-5'>
            <h2>CRUD de Items</h2>
            <form onSubmit={submitHandler}>

            </form>

        </div>
    )
}

export default CrudItems
