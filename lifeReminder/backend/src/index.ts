import sql from 'mssql';
import express from 'express';
import cors from 'cors';
import { dbConfig } from './config/config';

const app = express();
app.use(cors());
app.use(express.json());

sql.connect(dbConfig)
    .then(() => console.log('conexion exitosa con AZURE'))
    .catch(Error => console.log('Hubo un error al conectar con AZURE:', Error));

    app.get('/Usuarios', async (req, res) => {
        try {
            const result = await sql.query`SELECT * FROM Usuarios`;
            res.json(result.recordset);
        }catch (error) {
            res.status(500).json({ message:"no se pero algo paso"});
        }
    });

    app.listen(3000, () => {
        console.log(`Servidor corriendo en http://localhost:3000`);
    });