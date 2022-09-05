import express from 'express';
const app = express();
const port = 3001;
import indexRouter from './routes/index.js';
import cors from "cors";
import db from './config/database.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();    

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}));
app.use('/', indexRouter);

try {
    await db.authenticate();
} catch(error) {
    console.log("Unable to connect database : "+ error);
}

app.listen(port, () => {
    console.log(`Server running on port : ${port} `);
});