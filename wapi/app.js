const express = require('express')
const body = require('body-parser')
const app = express()
const port = 3000

app.use(body())

//https://www.robinwieruch.de/postgres-express-setup-tutorial/
//https://stackabuse.com/building-a-rest-api-with-node-and-express/
//https://www.frugalprototype.com/developpez-propre-api-node-js-express/
//https://github.com/cloudhead/node-static

//http://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

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
    const titre = req.body.titre; // récupération des variables du body
    const auteur = req.body.auteur
    const genre = req.body.genre

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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
