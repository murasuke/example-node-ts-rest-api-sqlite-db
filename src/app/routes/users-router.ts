import express from "express";
import UserController from "../controllers/user-controller";

 const router = express.Router();
const usersController = new UserController();

router.get("/", (req: Express.Request, res: Express.Response) => {
    usersController.findAll(res);
});

// ID を指定して1件取得
router.get('/:id', (req, res) => {
    usersController.findById(req, res);
});

// 登録
router.post('/', (req, res) => {
    usersController.create(req, res);
});

// 更新
router.put('/:id', (req, res) => {
    usersController.update(req, res);
});

// 削除
router.delete('/:id', (req, res) => {
    usersController.delete(req, res);
});

const usersRouter = router;
export default usersRouter;
