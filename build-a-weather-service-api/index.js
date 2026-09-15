import express from 'express';
import weatherRouter from './weather.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.route('/api/data').get((req, res) => {
    res.status(200).json({ data: 'data' });
}).post((req, res) => {
    res.status(201).json({ data: 'data' });
});

app.get('/api/greet/:name', (req, res) => {
    res.status(200).json({ name: req.params.name });
});

app.get('/api/info', (req, res) => {
    res.status(200).json({ 
        name: 'Weather Depo' ,
        version: "1.0.0",
        endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"]
    });
});

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'Operational' });
});

app.use('/api/weather', weatherRouter);

app.get('/docs', (req, res) => {
    res.redirect('/api/info');
});


app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
})