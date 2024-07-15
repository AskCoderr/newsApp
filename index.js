import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = ""; // ENTER YOUR API-KEY HERE

// getting response from the api
let response = null;
async function getResponse() {
    try {
        response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
    } catch (error) {
        console.error(error)
    }
}
getResponse();


app.use(express.static("public"));

app.get("/", (req, res) => {
    try {
        const titles = [];
        for (const o of response.data.articles) {
            titles.push(o.title);
        }
        res.render("index.ejs", { data: titles });
    } catch (error) {
        res.send("error");
        console.error(error);
    }
})

app.get("/response", (req, res) => {
    res.send(response.data);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
