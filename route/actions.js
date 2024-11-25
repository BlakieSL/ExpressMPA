const express = require('express');
const { validateInput } = require('../validationUtils');

const router = express.Router();

router.post('/add', (req, res) => {
    const db = req.app.get('db');
    const { email, name, surname, birthday } = req.body;
    const generatedUsername = email.split('@')[0];

    const sql = "INSERT INTO user (email, username, name, surname, birthday) VALUES (?,?,?,?,?)";

    if(!validateInput(email, name, surname, birthday)) {
        return res.status(400).send("Validation failed");
    }

    db.run(sql, [email, generatedUsername, name, surname, birthday], (err) => {
        if(err) {
            return res.status(500).send(err.message);
        }

        res.status(201);
    });
});

router.get('/:id', (req, res) => {
    const db = req.app.get('db');
    const id = req.params.id;
    const sql= "SELECT * FROM user WHERE id = ?";

    db.get(sql, [id], (err, user) => {
        if(err) {
            return res.status(500).send(err.message);
        }

        if(!user) {
            return res.status(404).send("User not found");
        }

        res.json(user);
    });
})

router.get('/', (req, res) => {
    const db = req.app.get('db');
    const sql = "SELECT * FROM user";

    db.all(sql, [], (err, users) => {
       if(err) {
           return res.status(500).send(err.message);
       }

       return res.json(users);
    });
});

module.exports = router;