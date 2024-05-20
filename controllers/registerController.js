const db = require('../database/models');
const op = db.Sequelize.Op;
const users = db.User;
const bcrypt = require("bcryptjs")

let registerController = {
    index: function(req, res){
        //Mostrar el formulario de registro
        return res.render('register');
    },
    store: function(req, res){ 
        // Guardar un usuario en la db
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
        }
        users.create(user)
        .then( function(user){
            return res.redirect("/login")
        })
        .catch(function(err){
            console.log(err)
        })     
    }
}

module.exports = registerController;