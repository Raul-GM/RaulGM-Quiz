var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RaulGM-Quiz', errors: []});
});

//Autoload de comandos con :quizID
router.param('quizId', 							quizController.load); 

//Definición de rutas de quizes
router.get('/quizes', 							quizController.index);
router.get('/quizes/:quizId(\\d+)', 			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 		quizController.answer);
router.get('/quizes/new', 						quizController.new);
router.post('/quizes/create', 					quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 		quizController.edit);
router.put('/quizes/:quizId(\\d+)', 			quizController.update);
router.delete('/quizes/:quizId(\\d+)', 			quizController.destroy);

router.get('/author', function(req, res, next) {
  res.render('author', { 
  	name: 'RaúlGM' ,
  	web: 'www.raul-gm.com',
  	avatar: 'avatar.jpg'
  });
});

//Búsqueda de preguntas
router.get('/quizes/search?:search?',			quizController.search);

module.exports = router;
