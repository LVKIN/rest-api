import express from "express";
import cors from "cors";
import itemsRouter from "./router/routes";

const PORT = process.env.PORT || 4000;

const HOSTNAME = "http://localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.use(cors ({
    origin: ['http://localhost:3000'],
}));

app.use('/api', itemsRouter);

app.use((req, res) => {
    res.status(404);
});


app.listen(PORT, () => {
    console.log(`Server is running in ${HOSTNAME}:${PORT}`)
});
