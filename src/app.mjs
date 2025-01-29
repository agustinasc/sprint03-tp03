import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import expressLayouts from 'express-ejs-layouts'
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 4000;


//Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Conexion a MongoDB
connectDB();

//Config de rutas
app.use('/api', superHeroRoutes);

app.set('view engine', 'ejs'); ///TP 03 - CONFIGURACION EJS
app.set('views', path.resolve('./views')); // Ajusta el path según tu estructura 

  
app.use(expressLayouts);
app.set('layout', 'layout')//Archivo base de layout

app.use(express.static(path.resolve('./public')));

//Ruta principal 
app.get('/', (req, res) =>
    res.render('index', {
        title: 'Pagina Principal',
        /* navbarLinks: [
            { text: 'Inicio', href: '/', icon: '/icon/home.svg'},
            { text: 'Lista de Superheroes', href: '/api/heroes', icon: '/icon/info.svg'},
            { text: 'Agregar Superheroes', href: '/api/formulario', icon: '/icon/contact.svg' }
        ]  */
    }))    
    
/* app.get('/lista', (req, res) => {
        res.render('dashboard', {title: 'Lista Superheroe'});
      });
app.get('/formulario', (req, res) => {
        res.render('addSuperhero', {title: 'Agregar Superheroe'});
      });
       */
    
//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada app.mjs"});
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    
})