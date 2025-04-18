import express from 'express';

const app = express();
const port = 5080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {    
    console.log(`Server is running at http://localhost:${port}`);
});