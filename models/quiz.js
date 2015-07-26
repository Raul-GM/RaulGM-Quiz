//DEFINICION DEL MODELO DE QUIZ
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',{
		pregunta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "Falta la pregunta"}}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "Falta la respuesta"}}
		},
		tema: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "Falta la respuesta"}}
		}
	})
}