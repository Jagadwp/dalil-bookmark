import express from 'express';
import indexRoutes from './routes/routes.js';
import * as db from "./db/mongoose.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// parse req body to json
app.use(express.json());

// connect db
db.connectMongoose();

// routes
app.use(indexRoutes);


app.listen(process.env.PORT, function () {
    console.log(`listening on http://localhost:${process.env.PORT}/`);
});


