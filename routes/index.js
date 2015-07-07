var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RaulGM-Quiz' });
});

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

//Definición de rutas de quizes
router.get('/quizes', 							quizController.index);
router.get('/quizes/:quizId(\\d+)', 			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 							quizController.answer);

router.get('/author', function(req, res, next) {
  res.render('author', { 
  	name: 'RaúlGM' ,
  	web: 'www.raul-gm.com',
  	avatar: 'avatar.jpg'
  });
});

module.exports = router;
