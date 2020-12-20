import express from "express";
import usersRouter from "./users-router";

const router = express.Router();

router.use( (req, res, next) =>{
    console.log(`${req.url} [${req.method}] : ${JSON.stringify(req.body)}`);

    next();
});

// API 別にルータを設定する
router.use("/users", usersRouter);

export default router;
