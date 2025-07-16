import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Opcional Knex para manejar las consultas SQL de forma más sencilla
import knex from "knex";

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error("📚 Error connecting to MySQL database:", err);
        return;
    }
    console.log("👌Connected to MySQL database");
})

// Creamos el CRUD para los Items con SQL
// Create
app.post("/items", async (req, res) => {

    const { nombre, descripcion} = req.body;

    console.log(`📚 Datos recibidos: , ${nombre}, ${descripcion}`);
    
    // Creamos la consulta SQL para insertar un nuevo item
    const query = "INSERT INTO productos (nombre, descripcion ) VALUES (?, ?)";

    // config de Knex para conectarse a la base de datos
/*     const knexConfig = {
        client: 'mysql2',
        connection: {
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        }
    }; */

    // insertamos los datos en la base de datos con Knex
/*     const guardado = await knex('productos').insert({
        nombre: nombre,
        descripcion: descripcion
    }); */

    //console.log(`📚 Datos guardados: ${guardado}`);
    

    // Ejecutamos la consulta
    db.query(query, [nombre, descripcion], (err, results) => {
        if (err) {
            console.error("📚 Error creating item:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.status(201).json({ nombre, descripcion });
    });
});

// Read
app.get("/items", async (req, res) => {
    // Creamos la consulta SQL para obtener todos los items
    const query = "SELECT * FROM productos";

    // Ejecutamos la consulta
    db.query(query, (err, results) => {
        if (err) {
            console.error("📚 Error fetching items:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.status(200).json(results);
    });
});

// Update
app.put("/items/:id", async (req, res) => {
    // Obtenemos el id del item a actualizar y los nuevos datos
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    // Creamos la consulta SQL para actualizar un item
    const query = "UPDATE productos SET nombre = ?, descripcion = ? WHERE idProductos = ?";

    // Ejecutamos la consulta
    db.query(query, [nombre, descripcion, id], (err, results) => {
        if (err) {
            console.error("📚 Error updating item:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.status(200).json({ message: "Item updated successfully" });
    });
});

// Delete
app.delete("/items/:id", async (req, res) => {
    // Obtenemos el id del item a eliminar
    const { id } = req.params;

    // Creamos la consulta SQL para eliminar un item
    const query = "DELETE FROM productos WHERE idProductos = ?";

    // Ejecutamos la consulta
    const guardado = db.query(query, [id], (err, results) => {
        if (err) {
            console.error("📚 Error deleting item:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.status(200).json({ message: "Item deleted successfully" });
    });

    console.log(`📚 Datos eliminados: ${guardado}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
