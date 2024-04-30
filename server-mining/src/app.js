import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from "dotenv";
import routes from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/", routes);

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);

export default app;
