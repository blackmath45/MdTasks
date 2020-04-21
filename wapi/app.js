const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const app = express()

const HTTP_PORT = 3000
const DB_SOURCE = "db.sqlite"

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//https://www.robinwieruch.de/postgres-express-setup-tutorial/
//https://stackabuse.com/building-a-rest-api-with-node-and-express/
//https://www.frugalprototype.com/developpez-propre-api-node-js-express/
//https://github.com/cloudhead/node-static

//http://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

/******************************************************************************/
/*                                  DB                                        */
/******************************************************************************/
let db = new sqlite3.Database(DB_SOURCE, (err) => {
  if (err)
  {
    // Cannot open database
    console.error(err.message)
    throw err
  }
  else
  {
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text,
      email text UNIQUE,
      password text,
      CONSTRAINT email_unique UNIQUE (email)
    )`,
    (err) => {
      if (err)
      {
        // Table already created
      }
      else
      {
        // Table just created, creating some rows
        var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
        db.run(insert, ["admin","admin@example.com","admin123456"])
        db.run(insert, ["user","user@example.com","user123456"])
      }
    });
  }
});
/******************************************************************************/

/****************************************************** STATIC AND rest

var express = require('express');
//init Express
var app = express();
//init Express Router
var router = express.Router();
var port = process.env.PORT || 8080;
// GET /status
router.get('/status', function(req, res) {
    res.json({ status: 'App is running!' });
});
//connect path to router
app.use("/", router);
app.use(express.static('static'))
var server = app.listen(port, function () {
    console.log('node.js static content and REST server listening on port: ' + port)
})
*********************************************************************/




/*
app.use(express.json()); ??????????
app.use(express.urlencoded({ extended: true })); ????????
*/

/*
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
*/

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});
/*
app.get('/', async (req, res) => {
    const livres = await Livres.find() // On récupère tout les livres
    await res.json(livres)
});

app.patch('/:id', async(req, res) => {
    const id = req.params.id
    const livre = await Livres.findOne({_id : id}) // on récupere le livre pour pouvoir le modifier

    // on récupère les valeurs potentiellement modifiées
    const titre = req.body.titre;
    const auteur = req.body.auteur
    const genre  = req.body.genre;

    // on vérifie maintenant si les valeurs sont remplies, si elles le sont on modifie l'ancienne valeure par la nouvelle

    if (titre) {
        livre.titre = titre
    }
    if (auteur) {
        livre.auteur = auteur
    }
    if (genre) {
        livre.genre = genre
    }

    await livre.save() // on sauvegarde les modifications

    res.json(livre)



})

app.post('/', async (req, res) => {
    const titre = req.bodyParser.titre; // récupération des variables du body
    const auteur = req.bodyParser.auteur
    const genre = req.bodyParser.genre

    if (!genre || !auteur  || !titre) { // on vérifie que les trois variables sont présentes
        res.send('Il manque un argument')
        return
    }

    const nouveau_livre = new Livres({ // création d'un objet représentant notre nouveau livre
        titre : titre,
        auteur : auteur,
        genre : genre
    })

    await nouveau_livre.save() // sauvegarde asynchrone du nouveau livre
    res.json(nouveau_livre)
    return

});*/

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(HTTP_PORT, () => console.log(`Example app listening at http://localhost:${HTTP_PORT}`))
