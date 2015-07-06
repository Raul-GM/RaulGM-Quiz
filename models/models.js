var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');
//USAR BBDD Sqlite
var sequelize = new Sequelize(null, null, null,{ dialect: "sqlite", storage: "quiz.sqlite" });

//Importar la definición para la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; //Exportar definición de la tabla Quiz

//Sync -> Crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count === 0){ //Si la tabla está vacía se inicializa
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})
		}	
	})
});