import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: String,
    time: Number,
    date: Date,
    numberGuesses: Number,
    allowRepeatingLetters: Boolean,
});

const HighscoreDB = mongoose.model('Highscore', taskSchema);

export { HighscoreDB };