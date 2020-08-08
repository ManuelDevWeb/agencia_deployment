//Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const configs = require('./config/index');

require('dotenv').config({ path: 'variables.env' })

//const db = require('./config/database');
//Validando la conexion de la BD
//db.authenticate()
//   .then(() => {
//        console.log('DB Conectada')
//    })
//    .catch((error) => {
//        console.log(error)
//   });


//Configurar express
const app = express();

//Habilitar pug
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//Cargar carpeta statica llamada public
app.use(express.static('public'));

//Validamos si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

//Creamos la variable para el sitio web
app.locals.titulo = config.nombreSitio;

//Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    //Crear una fecha
    const fecha = new Date();
    //Se guarda la variables en locals como fechaActual
    res.locals.fechaActual = fecha.getFullYear();
    //console.log(res.locals.fechaActual);
    //Nos retorna el nombre de la pagina actual
    res.locals.ruta = req.path;
    //Return next para que siga ejecutando la siguiente funcion
    return next();
});

//Ejecutamos el body parser
app.use(bodyParser.urlencoded({ extended: true }));

//Cargamos las rutas
app.use('/', routes());

//Puerto y host para la app (Heroku nos da el puerto)
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4200;

app.listen(port, host, () => {
    console.log('Servidor funcionando!');
});