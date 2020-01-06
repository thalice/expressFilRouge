//require("dotenv".config()
//let CONFIG={};
//CONFIG.host=process.env.REACT_HOST;
//CONFIG.password=process.env.REACT_PASSWSORD;
//CONFIG.user=process.env.REACT_USER;
//CONFIG.database=process.env.REACT_DATABASE;
//module.exports =CONFIG;

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost", //"127.0.0.1",
  port: "3306",
  user: "root", // le nom d'utilisateur
  password: "Jecode4L&lle", // le mot de passe
  database: "biblio" // le nom de la base de données
});
module.exports = connection;
