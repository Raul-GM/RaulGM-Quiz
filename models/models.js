var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 		= (url[6]||null);
var user 			= (url[2]||null);
var pwd 			= (url[3]||null);
var protocol 		= (url[1]||null);
var dialect 		= (url[1]||null);
var port 			= (url[5]||null);
var host	 		= (url[4]||null);
var storage 		= process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');
//USAR BBDD Sqlite
var sequelize = new Sequelize(DB_name, user, pwd,
	{ dialect: protocol,
	  protocol: protocol,
	  port: port,
	  host: host,
	  storage: storage, // solo SQLite (.env)
	  omitNull: true, // solo Postgres
	  dialectOptions: {
     	ssl: true
      }
  	}
);

//Importar la definición para la tabla Quiz en quiz.js y en comments.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comments'));

//Relación 1 a n
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; //Exportar definición de la tabla Quiz
exports.Comment = Comment; //Exportar tabla comment

//Sync -> Crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count === 0){ //Si la tabla está vacía se inicializa
			Quiz.create({
				pregunta: 		'Capital de Italia',
				respuesta: 		'Roma',
				tema: 			'geografia'
			});
			Quiz.create({
				pregunta: 		'Capital de Portugal',
				respuesta: 		'Lisboa',
				tema: 			'geografia'
			}).then(function(){
				console.log('Base de datos inicializada');
			});
		}	
	})
});