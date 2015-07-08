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
	console.log("INDEX!!!");
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes: quizes, resultado: ''});
	}).catch(function(error){next(error);})
};

// GET /quizes/:id
exports.show = function(req, res){	
	res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = "Incorrecto";
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = "Correcto";
	}
	res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado});
};

//Búsqueda de preguntas
exports.search = function(req, res){
	console.log("BÚSQUEDA DE PREGUNTAS: " + req.query.search);
	var busqueda = '%'+req.query.search.replace(/ /g, '%')+'%';

	models.Quiz.findAll({
		where:{
			pregunta:{
				$like: busqueda
			}
		}
	}).then(function(quizes){
		res.render('quizes/index', { quizes: quizes, resultado: req.query.search});
	}).catch(function(error){next(error);})
}
