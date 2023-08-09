import "dotenv/config";
import './db/dbConnect.js'
import { app } from "./app.js";

const HOST = "localhost";
const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening on port http://${HOST}:${port}`);
});