const db = require("../database/models");
const bcrypt = require("bcryptjs")
const op = db.Sequelize.Op;

let loginController = {
  index: function (req, res) {
    //Mostramos el form de login
    return res.render("login");
  },
  login: function (req, res) {
    // Buscar el usuario que se quiere loguear.
    db.User.findOne({
      where: [
        {
          email: req.body.email,         
        },
      ],
    })
      .then(function (user) {
        let validPassword = bcrypt.compareSync(req.body.password,user.password )
        console.log("validpassword? : ", validPassword)
        req.session.user = user;
        //console.log("user en session: ", req.session.user);

        //Si tildó recordame => creamos la cookie.
        if (req.body.rememberme != undefined) {
          res.cookie("userId", user.id, { maxAge: 1000 * 60 * 5 });
        }
        return res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  logout: function (req, res) {
    //Destruir la sessión
    req.session.destroy();

    //Destruir la cookie
   res.clearCookie("userId")

    //redireccionar a home
    return res.redirect("/");
  },
};

module.exports = loginController;
