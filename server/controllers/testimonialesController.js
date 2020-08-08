const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async(req, res) => {
    const testimoniales = await Testimonial.findAll();
    //console.log(testimoniales)
    //Primer parametro ruta, segundo parametro configuracion
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales: testimoniales
    });
}

//Cuando se llena el formulario
exports.agregarTestimonial = async(req, res) => {
    //Validar que todos los campos esten llenos
    let { nombre, correo, mensaje } = req.body;
    let errores = [];

    if (nombre === '' || nombre === null) {
        errores.push({ 'mensaje': 'Agrega tu Nombre' })
    }
    if (correo === '' || correo === null) {
        errores.push({ 'mensaje': 'Agrega tu Correo' })
    }
    if (mensaje === '' || mensaje === null) {
        errores.push({ 'mensaje': 'Agrega tu Mensaje' })
    }

    //Revisar por errores
    if (errores.length > 0) {
        //Muestra a la vista testimoniales y los errores
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        });
    } else {
        //Almacenamos el la BD
        Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then((testimonial) => {
                res.redirect('/testimoniales')
            })
            .catch((error) => {
                console.log(error)
            });
    }
}