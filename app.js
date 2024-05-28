import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// API URL
const URL = 'https://v2.jokeapi.dev';

// Static
app.use(express.static("public"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post('/', async (req, res) => {
    try {
        const type = req.body.type;
        const result = await axios.get(URL + `/joke/${type}`);
        const data = {
            type: result.data.type,
            category: result.data.category,
            joke: result.data.joke,
            setup: result.data.setup,
            delivery: result.data.delivery
        }
        console.log(result.data);
        res.render('index.ejs', { data });
    } catch (error) {
        res.send(error);
    }
});

// Listen on Port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
