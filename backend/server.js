import express from "express";
import fs from "fs";

const app = express();
const port = 5080;

app.use(express.json());

app.get("/", async (req, res) => {
    const htmlText = await fs.promises.readFile("frontend/dist/index.html");
    res.send(htmlText.toString());
  });

  app.get("/about", async (req, res) => {
    const htmlText = await fs.promises.readFile("frontend/dist/about.html");
    res.send(htmlText.toString());
  });

app.get('/api/random', async (req, res) => {
});

app.get('/api/guess'), async (req, res) => {
    
}

app.use("/assets", express.static("frontend/dist/assets"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
