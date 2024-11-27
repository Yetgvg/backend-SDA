import express from "express";
import router from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(router); 

app.get("/", (req, res) => {
  res.send("Teste");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
