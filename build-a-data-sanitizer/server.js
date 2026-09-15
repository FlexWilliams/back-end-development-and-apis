import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { inputCleaner, inputValidator } from './middleware.js';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/form", express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.redirect("/form");
});


app.get('/form', (req, res) => {
    res.status(200).send();
});


const router = express.Router();

router.use((req, res, next) => {
    inputCleaner(req, res, next);
    const redirect = inputValidator(req, res, next);

    if (!redirect) {

    next();

    }
});

router.post('/', (req, res) => {
    if (req.body.username && req.body.username.length > 2) {
    res.json({username: req.body.username, comment: req.body.comment });

    }
});

app.use('/submit', router); // Apply the router


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});