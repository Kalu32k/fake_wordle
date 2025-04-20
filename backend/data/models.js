import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: String,
    time: Number,
    date: Date,
});

const HighscoreDB = mongoose.model('Highscore', taskSchema);

export { HighscoreDB };