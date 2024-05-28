import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

// API URL
const URL = 'https://v2.jokeapi.dev';

// Static
app.use(express.static('public'));

// Route
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(URL + '/joke/Any');
        const data = {
            category: JSON.stringify(response.data.category),
            joke: JSON.stringify(response.data.joke),
            setup: JSON.stringify(response.data.setup),
            delivery: JSON.stringify(response.data.delivery)
        }
        res.render('index.ejs', {data});  
    } catch (error) {
        res.send(error);
    }
    
});

// Listen on Port 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});