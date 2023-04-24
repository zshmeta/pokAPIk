
 // Import des modules
const port = 3000;

 const express = require('express');
 const fs = require('fs');
 const path = require('path');
 const app = express();
 const bodyParser = require('body-parser');

 app.use(express.static(path.join(__dirname, 'public')));
 app.use(express.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 // class Object carte pokemon
 class Pokemon {
   constructor(nom, type, imageSrc,imageSrc2, imageSrc3) {
     this.nom = nom;
     this.type = type;
       this.imageSrc = imageSrc;
       this.imageSrc2 = imageSrc2;
       this.imageSrc3 = imageSrc3;
   }
 }

 // Récupérer la page index.html

 app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });


app.post("/user", (req, res) => {
    const body = req.body;
    if (!body) {
        resizeBy.status(400).send("Error add user cannot be empty")
    }
    const new_user = add_user(body.username);
    res.status(201).send(new_user);
 })


 // Récupérer toutes les cartes Pokemon dans le fichier pokemonList.json methode GET
app.get('/cartes', (req, res) => {
     
   fs.readFile('pokemonList.json', 'utf8', (err, data) => {
     if (err) {
       console.error(err);
       res.status(500).send('Erreur serveur');
       return;
     }
     const cartes = JSON.parse(data).Pokemon;
     res.send(Pokemon);
   });
 });

 // Récupérer une carte Pokemon spécifique en utilisant son nom dans le fichier pokemonList.json methode GET
 app.get('/cartes/:nom', (req, res) => {

   // On utilise ici la methode proposer
   // j'ai decider de reecrire toute les func pour cette raison
   // source: https://www.youtube.com/shorts/KEB2TkjtN1U

   try {
     const data =  fs.promises.readFile('pokemonList.json', 'utf8');
     const cartes = JSON.parse(data).cartesPokemon;

     // Maintenant je fais gaffe auc majuscule

     const carte = cartes.find(c => c.nom.toLowerCase() === req.params.nom.toLowerCase());

     //Methode if negative de notre ami en CDA

     if (!carte) {
       res.status(404).send('Carte Pokémon introuvable');
       return;
     }
     res.send(carte);

   } catch (err) {
     console.error(err);
     res.status(500).send('Erreur serveur');
   }


 // Old function doesn't look as good

   // fs.readFile('pokemonList.json', 'utf8', (err, data) => {
   //   if (err) {
   //     console.error(err);
   //     res.status(500).send('Erreur serveur');
   //     return;
   //   }
   //   const cartes = JSON.parse(data).cartesPokemon;
   //   const carte = cartes.find(c => c.nom.toLowerCase() === req.params.nom.toLowerCase());
   //   if (!carte) {
   //     res.status(404).send('Carte Pokémon introuvable');
   //     return;
   //   }
   //   res.send(carte);
   // });
 });

 // Ajouter une carte Pokemon dans le fichier pokemonList.json methode POST
 app.post('/cartes', (req, res) => {
   const { nom, type, imageSrc } = req.body;

   if (!nom || !type || !imageSrc) {
     res.status(400).send('impossible d\'ajouter la carte Pokémon. Il manque des infos.');
     return;
   }

   const nouvelleCarte = new CartePokemon(nom, type, imageSrc);

   fs.readFile('pokemonList.json', 'utf8', (err, data) => {
     if (err) {
       console.error(err);
       res.status(500).send('Erreur serveur');
       return;
     }

     const cartesData = JSON.parse(data);
     cartesData.cartesPokemon.push(nouvelleCarte);

     fs.writeFile('pokemonList.json', JSON.stringify(cartesData), err => {
       if (err) {
         console.error(err);
         res.status(500).send('Erreur serveur');
         return;
       }

       res.status(201).send(nouvelleCarte);
     });
   });
 });

 // Modifier une carte Pokemon à partir de son id dans le fichier pokemonList.json methode PUT
 app.put('/cartes/:id', (req, res) => {


   const { nom, type, imageSrc } = req.body;

   if (!nom || !type || !imageSrc) {
     res.status(400).send('Certaines informations sont manquantes pour mettre à jour la carte Pokémon.');
     return;
   }

   fs.readFile('pokemonList.json', 'utf8', (err, data) => {
     if (err) {
       console.error(err);
       res.status(500).send('Erreur serveur');
       return;
     }

     const cartesData = JSON.parse(data);
     const carteIndex = cartesData.cartesPokemon.findIndex(c => c.id === parseInt(req.params.id));

     if (carteIndex === -1) {
       res.status(404).send('Carte Pokémon introuvable');
       return;
     }

     cartesData.cartesPokemon[carteIndex] = { ...cartesData.cartesPokemon[carteIndex], nom, type, imageSrc };

     fs.writeFile('pokemonList.json', JSON.stringify(cartesData), err => {
       if (err) {
         console.error(err);
         res.status(500).send('Erreur serveur');
         return;
       }

       res.send(cartesData.cartesPokemon[carteIndex]);
     });
   });
 });



 // Supprimer une carte Pokemon à partir de son nom dans le fichier pokemonList.json methode DELETE
 app.delete('/cartes/:nom', (req, res) => {


   fs.readFile('pokemonList.json', 'utf8', (err, data) => {
     if (err) {
       console.error(err);
       res.status(500).send('Erreur serveur');
       return;
     }

     const cartesData = JSON.parse(data);
     const carteIndex = cartesData.cartesPokemon.findIndex(c => c.nom.toLowerCase() === req.params.nom.toLowerCase());

     if (carteIndex === -1) {
       res.status(404).send('Carte Pokémon introuvable');
       return;
     }

     cartesData.cartesPokemon.splice(carteIndex, 1);

     fs.writeFile('pokemonList.json', JSON.stringify(cartesData), err => {
       if (err) {
         console.error(err);
         res.status(500).send('Erreur serveur');
         return;
       }

       res.status(204).send(); // Renvoie un statut 204 No Content pour indiquer que la suppression a été effectuée avec succès
     });
   });
 })



 app.listen(
   4000, () => {
     console.log('Serveur démarré sur le port 3000');
   });