import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;


//Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Conexion a MongoDB
connectDB();

//Config de rutas
app.use('/api', superHeroRoutes);

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views')); // Ajusta el path según tu estructura */
app.set('view engine', 'ejs'); ///TP 03 - CONFIGURACION EJS
  
 

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada app.mjs"});
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    
})