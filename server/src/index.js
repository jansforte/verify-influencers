const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const {default:helmet} = require("helmet");
const cors = require('cors');

const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(errorHandler);

//Rutas
const influencer=require("./routes/influencerRoutes");

app.use("/api/influencer",influencer);

app.listen(PORT, ()=>{
    console.log("Servidor Iniciado en el puerto "+PORT);
})