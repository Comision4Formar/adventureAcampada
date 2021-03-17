const { Sequelize } = require('sequelize')
const db = require('../database/models')

const controllers = {
    home : (req, res) => {
       let recomendados = db.product.findAll({
		order : Sequelize.literal('rand()'),
		limit : 4,
		include : [
			{association : 'imagenes'}
		]
	   })
	   let masVendidos = db.product.findAll({
			order : Sequelize.literal('rand()'),
		   limit : 8,
		   include : [
			{association : 'imagenes'}
		]
	   })
	   Promise.all([recomendados,masVendidos])
	   .then(([recomendados,masVendidos]) => {
			res.render('index', {
				title: 'Home',
				recomendados,
				masVendidos,
		
			})
	   })
	   .catch(error => res.send(error))
     
    },
    search: (req, res) => {
		// Busqueda
		const result = products.filter(product =>{
			return product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim())
			/* El trim es para evitar errores de busqueda debido a espacios de mas */
		})
		res.render('results',{
			result,
			search: req.query.keywords,
			
		})
	}
}

module.exports = controllers;