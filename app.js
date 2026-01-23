// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen// 1. Route pour la vérification de Meta (GET)
app.get('/webhook', (req, res) => {
    // Cette partie répond à Meta pour dire "Oui, c'est bien mon serveur"
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === 'VOTRE_TOKEN_SECRET') {
        console.log("Vérification réussie !");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// 2. Route pour recevoir les messages (POST)
// C'est ici que vous traiterez les futurs messages de vos projets (ex: Compta-Vite)
app.post('/webhook', (req, res) => {
    console.log("Nouveau message reçu !", req.body);
    res.sendStatus(200);
});
// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});

