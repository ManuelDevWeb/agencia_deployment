exports.configNosotros = (req, res) => {
    //Primer parametro ruta, segundo parametro configuracion
    res.render('nosotros', {
        pagina: 'Sobre Nosotros'
    });
}