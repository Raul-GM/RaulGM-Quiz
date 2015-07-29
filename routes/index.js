var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RaulGM-Quiz', errors: []});
});

//Autoload de comandos con :quizID
router.param('quizId', 									quizController.load); 
router.param('commentId', 								commentController.load); 

//Definición de rutas de sesion
router.get('/login', 									sessionController.new);
router.post('/login', 									sessionController.create);
router.get('/logout', 									sessionController.destroy);


//Definición de rutas de quizes
router.get('/quizes', 									sessionController.updateActivity, quizController.index);
router.get('/quizes/:quizId(\\d+)', 					sessionController.updateActivity, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 				sessionController.updateActivity, quizController.answer);
router.get('/quizes/new', 								sessionController.autologout, sessionController.updateActivity, sessionController.loginRequired, quizController.new);
router.post('/quizes/create', 							sessionController.autologout, sessionController.updateActivity, sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',		 		sessionController.autologout, sessionController.updateActivity, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 					sessionController.autologout, sessionController.updateActivity, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',		 			sessionController.autologout, sessionController.updateActivity, sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)\/comments/new', 		sessionController.updateActivity, commentController.new);
router.post('/quizes/:quizId(\\d+)\/comments', 			sessionController.updateActivity, commentController.create);
router.get('/quizes/:quizId(\\d+)\/comments/:commentId(\\d+)/publish', 		sessionController.autologout, sessionController.updateActivity, sessionController.loginRequired, commentController.publish);

router.get('/author', 									sessionController.updateActivity, quizController.author);

//Búsqueda de preguntas
router.get('/quizes/search?:search?',					sessionController.updateActivity, quizController.search);

module.exports = router;
