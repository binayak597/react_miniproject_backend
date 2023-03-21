import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connection } from "./connection/database.js";
import { router } from "./routes/routes.js";
import { userValidator } from "./middlewares/userValidator.js";
import { authenticator } from "./middlewares/authenticator.js";
import { userLogger } from "./middlewares/userLogger.js";
import { roleValidator } from "./middlewares/roleValidator.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(userValidator);
app.use(authenticator);
app.use(userLogger);
app.use("/user", roleValidator);
app.use("/user", router);

let port = process.env.PORT;
if(port == null || port == ""){
    port = 8000;
}

app.listen(port, async () => {
    await connection
    .then(() => console.log("db is connected..."))
    .catch((err) => console.log(err));

    console.log(`server is running on ${port}.`);
});
