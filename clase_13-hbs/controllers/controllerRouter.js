


const homeApp = (req, res) => { // creamos una ruta para la página de inicio
    res.render('index'); // renderizamos la vista index.hbs
}


const altaApp = (req, res) => { // creamos una ruta para la página de alta
    res.render('alta'); // renderizamos la vista alta.hbs
}

const contactoApp = (req, res) => { // creamos una ruta para la página de contacto
    res.render('contacto'); // renderizamos la vista contacto.hbs
}

const nosotrosApp = (req, res) => { // creamos una ruta para la página de nosotros  
    res.render('nosotros'); // renderizamos la vista nosotros.hbs
}

module.exports = { // exportamos las rutas para usarlas en otros archivos
    homeApp, // exportamos la ruta de inicio
    altaApp, // exportamos la ruta de alta
    contactoApp, // exportamos la ruta de contacto
    nosotrosApp // exportamos la ruta de nosotros
}

