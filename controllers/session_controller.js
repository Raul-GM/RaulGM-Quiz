var expirationTime = 5000;
var activityTime;

//Autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
};

//Get login --- Formulario de login
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

//POST login -- crear la sesión
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');

	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{"message": "Se ha producido un error: " + error}];
			res.redirect('/login');
			return;
		}

		//Crear req.session.user y guardar los campos id y username
		//La sesión se defina por la existencia de req.session.user
		req.session.user = {id:user.id, username:user.username};
		//GUARDAMOS LA FECHA DEL LOGIN
		activityTime = new Date();
		res.redirect(req.session.redir); // -> Redirecciona al path anterior al login
	});
};

//DELETE logiut
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir); // -> Redirecciona al path anterior al login
};

//AUTOLOGOUT
exports.autologout = function(req, res, next){
	if(!req.session.user){ //NO ESTÁ LOGADO
		next();
	}else{
		var now = new Date();
		activityTime.setMilliseconds(activityTime.getMilliseconds() + expirationTime);
		
		if(now>activityTime){
			delete req.session.user;
			req.session.errors = [{"message": "Se ha cerrado la sesión por inactividad."}];
			res.redirect('/login');
			return;
		}else{
			next();
		}
	}
};

exports.updateActivity = function(req, res,next){
	activityTime = new Date();
	next();
}