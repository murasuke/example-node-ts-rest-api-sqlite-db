import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./app/routes/router";

const app = express();

app.use(cors());

// DB を準備する
import {init} from './app/db/db';
init();

const port = process.argv[2] || 3000;
app.listen(port, () => {
  console.log(`サーバ起動 : http://localhost:${port}/`);
});

// POST されたデータを受け取るための設定を行う
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ルータを設定する
const restApiRoot = '/api';
app.use(restApiRoot, router);