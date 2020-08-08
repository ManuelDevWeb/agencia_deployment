const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.configHome = async(req, res) => {
    //Limitamos a 3 resultados
    const viajes = await Viaje.findAll({ limit: 3 });

    const testimoniales = await Testimonial.findAll({ limit: 3 });

    //Primer parametro ruta, segundo parametro configuracion
    res.render('index', {
        pagina: 'Próximos Viajes',
        clase: 'home',
        viajes: viajes,
        testimoniales: testimoniales
    });
}