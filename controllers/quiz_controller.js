var models = require('../models/models.js');

//AUTOLOAD: Factoriza el çódsigo si la ruta inlucye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{ next(new Error('No existe la pregunta seleccionada -> ' + quizId)); }
	}).catch(function(error){next(error);})
};

//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes: quizes, resultado: '', errors: []});
	}).catch(function(error){next(error);})
};

// GET /quizes/:id
exports.show = function(req, res){	
	res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = "Incorrecto";
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = "Correcto";
	}
	res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado, errors: []});
};

//Búsqueda de preguntas
exports.search = function(req, res){
	var busqueda = '%'+req.query.search.replace(/ /g, '%')+'%';

	models.Quiz.findAll({
		where:{
			pregunta:{
				$like: busqueda
			}
		}
	}).then(function(quizes){
		res.render('quizes/index', { quizes: quizes, resultado: req.query.search, errors: []});
	}).catch(function(error){next(error);})
}

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build({
		pregunta: "Pregunta",
		respuesta: "Respuesta"
	});
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// GET /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
		console.log(err);
		if(err){
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		}else{
			quiz.save({fields:["pregunta", "respuesta", "tema"]}).then(function(){
				res.redirect('/quizes');
			})
		}
		}
	);
};

// GET /quizes/new
exports.edit = function(req, res){
	var quiz = req.quiz; //autoload de la instancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// GET /quizes/create
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	req.quiz.validate().then(function(err){
		console.log(err);
		if(err){
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		}else{
			req.quiz.save({fields:["pregunta", "respuesta", "tema"]}).then(function(){
				res.redirect('/quizes');
			})
		}
		}
	);
};

// GET /quizes/new
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){
		next(error);
	});
};