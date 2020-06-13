const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const cookieParser = require('cookie-parser');
const routes = require("./routes/index");
const app = express();
mongoose.connect('mongodb+srv://admin:adminulacitoifapassword@cluster-fz8qx.mongodb.net/vinil?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));
Object.entries(routes).forEach(([path, router]) => app.use(`/api/v1/${path}`, router));
app.get('*', (_, res) => res.sendFile(path.join(__dirname + '/../build/index.html')));
app.listen(process.env.PORT || 8080);