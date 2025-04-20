import express from "express";
import fs from "fs";
import { test } from "./logic/test.js";
import mongoose from "mongoose";
import { HighscoreDB } from "./data/models.js";
import { generateRandomWord } from "./logic/generateWord.js";
import { chosenWord } from "./logic/generateWord.js";

const app = express();
const PORT = 5080;

app.use(express.json());

app.get("/", async (req, res) => {
  const htmlText = await fs.promises.readFile("frontend/dist/index.html");
  res.send(htmlText.toString());
});

app.get("/about", async (req, res) => {
  const htmlText = await fs.promises.readFile("frontend/dist/about.html");
  res.send(htmlText.toString());
});


app.post("/api/random", async (req, res) => {
  try {
    const { wordLength, allowRepeatingLetters } = req.body;
    console.log(`Received wordLength: ${wordLength}`);
    console.log(`Allow repeating letters: ${allowRepeatingLetters}`);

    let generatedWord = await generateRandomWord(wordLength, allowRepeatingLetters);
    console.log("Words:", generatedWord);



    if (generatedWord.length === 0) {
      throw new Error("No valid words found with the given constraints.");
    }

  console.log(generatedWord);
    res.json( ' was generated' );
  } catch (error) {
    res.status(500).json({ error: "Internal server error on random" });
  }
});

app.post("/api/guess", (req, res) => {
  try {
    const { guess } = req.body;
    console.log("Received guess:", guess);

    console.log('hello')
    let bridge = chosenWord;
    console.log("Bridge word:", bridge);

    console.log('is this fired?');
    const result = test(guess, bridge);
    console.log("Result:", result);



    res.json({ result });
  } catch (error) {
    console.error("Error processing guess:", error);
    res.status(500).json({ error: "Internal server error on guess" });
  }
});


app.get("/api/highscores", async (req, res) => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    const getHighscores = await HighscoreDB.find().sort({ time: 1 }).limit(10);
    res.json({ highscores: getHighscores });
  } catch (error) {
    console.error("Error fetching highscores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/api/highscore", async (req, res) => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
// await mongoose.connect(process.env.MONGO_URL);

    const newHighscore = new HighscoreDB({
      name: req.body.name,
      time: req.body.time,
      date: req.body.date,
    });

    console.log(newHighscore);
    await newHighscore.save();

    const updatedHighscores = await HighscoreDB.find().sort({ time: 1 }).limit(10);

    res.status(201).json({ newHighscore, highscores: updatedHighscores });
  } catch (error) {
    console.error("Error saving highscore:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/assets", express.static("frontend/dist/assets"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
