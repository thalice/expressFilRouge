const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//1 ROUTE GET *
app.get("/api/biblio", (req, res) => {
  connection.query("SELECT * from library", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des livres");
    } else {
      res.json(results);
    }
  });
});

// 2 ROUTE GET ALL TITLES
app.get("/api/biblio/titles", (req, res) => {
  connection.query("SELECT title from library", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des titres");
    } else {
      res.json(results);
    }
  });
});

// 3 ROUTE GET CONTAINING "THE"
app.get("/api/biblio/titles/the", (req, res) => {
  connection.query(
    "SELECT title from library WHERE title LIKE '%the%'",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des titres");
      } else {
        res.json(results);
      }
    }
  );
});

// 4 ROUTE GET TITLE STARTING WITH "A"
app.get("/api/biblio/titleswitha", (req, res) => {
  connection.query(
    "SELECT title from library WHERE title LIKE 'A%'",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des titres");
      } else {
        res.json(results);
      }
    }
  );
});

// 5 ROUTE GET DATE RENTAL AFTER 2019/07/01
app.get("/api/biblio/rental", (req, res) => {
  connection.query(
    "SELECT title,rentalDate from library WHERE rentalDate >='2019-07-01'",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des titres");
      } else {
        res.json(results);
      }
    }
  );
});

// 6 ROUTE GET BY DESCENDING ORDER TITLE
app.get("/api/biblio/order", (req, res) => {
  connection.query(
    "SELECT title from library ORDER BY title DESC",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des titres");
      } else {
        res.json(results);
      }
    }
  );
});

// 7 POST A NEW BOOK
app.post("/api/biblio/add", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO library SET ?", formData, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un livre");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// 8 PUT CHANGE A TITLE
app.put("/api/biblio/:id", (req, res) => {
  const idTitle = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE library SET ? WHERE id = ?",
    [formData, idTitle],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un livre");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// 9 PUT CHANGE frenchVersion
app.put("/api/biblio/version/:id", (req, res) => {
  const idBook = req.params.id;
  connection.query(
    "UPDATE library SET frenchVersion =!frenchVersion WHERE id = ?",
    [idBook],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un livre");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// 10 DELETE A BOOK
app.delete("/api/biblio/:id", (req, res) => {
  const idBook = req.params.id;
  connection.query("DELETE FROM library WHERE id = ?", [idBook], err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un livre");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// 11 DELETE EVERY frenchVersion= 0
app.delete("/api/biblio/version", (req, res) => {
  connection.query("DELETE FROM library WHERE frenchVersion=0", err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un livre");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
