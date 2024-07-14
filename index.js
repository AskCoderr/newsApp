import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = ""; // ENTER YOUR API-KEY HERE

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
        res.render("index.ejs", {data: response.data});
    } catch (error) {
        res.send("error");
        console.error(error);
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
