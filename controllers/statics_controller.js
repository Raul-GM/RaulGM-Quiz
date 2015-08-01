var models = require('../models/models.js');

exports.index = function(req, res, next){
	var questionsWithComments = 0,
		questionsWithoutComments = 0,
		statics = [];
	models.Quiz.findAndCountAll().then(function(result){
		req.numPreguntas = result.count;
		statics.push({
			title: "Número total de preguntas",
			result: req.numPreguntas
		});
		models.Comment.findAndCountAll().then(function(result){
			req.numComentarios = result.count;
			statics.push({
				title: "Número total de comentarios",
				result: req.numComentarios
			});
			if(parseInt(req.numPreguntas) === 0){
				req.media = 0;
			}else{
				req.media = (parseInt(req.numComentarios)/parseInt(req.numPreguntas)).toFixed(2);
			}
			statics.push({
				title: "Número medio de comentarios por preguntas",
				result: req.media
			});

			models.Quiz.findAll({
				include: [{
					model: models.Comment
				}]}).then(function(result){
					for(var i in result){
						if(result[i].Comments.length === 0){
							questionsWithoutComments++;
						}else{
							questionsWithComments++;
						}
					}
					statics.push({
						title: "Número de preguntas con comentarios",
						result: questionsWithComments
					});
					statics.push({
						title: "Número de preguntas sin comentarios",
						result: questionsWithoutComments
					});
					res.render('quizes/statics', { statics: statics, errors: []});
				})
			.catch(function(error){next(error);})
		}).catch(function(error){next(error);})
		//res.render('quizes/index', { quizes: quizes, resultado: '', errors: []});
	}).catch(function(error){next(error);})
};