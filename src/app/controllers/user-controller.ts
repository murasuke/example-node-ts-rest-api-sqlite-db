import Controller from "./controller";
import UserModel from "../models/user-model";
import UserEntity from "../entities/user-entity";

export default class UsersController {
    controller: Controller;
    userModel: UserModel;

    constructor(){
        this.controller = new Controller();
        this.userModel = new UserModel();
    }

    /**
   * 全件取得する
   * 
   * @param res レスポンス
   */
  findAll(res: Express.Response) {
    this.userModel.findAll()
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  /**
   * ID を指定して1件取得する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  findById(req: any, res: Express.Response) {
    const id = Number.parseInt( req.params.id );
    
    this.userModel.findById(id)
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  /**
   * 登録する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  create(req: any, res: any) {
    const user = new UserEntity();
    // user.id = req.body.id;
    user.name = req.body.name;
    user.age = Number.parseInt(req.body.age);
    
    this.userModel.create(user)
      .then(this.controller.createSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  /**
   * 登録 or 更新する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  update(req: any, res: any) {
    const user = new UserEntity(req.body.id, req.body.name, req.body.age);
    
    this.userModel.update(user)
      .then(this.controller.editSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  /**
   * 削除する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  delete(req: any, res: any) {
    const id = req.params.id;
    
    this.userModel.delete(id)
      .then(this.controller.editSuccess(res))
      .catch((error: any) => {
        if(error.errorCode === 21) {
          // 削除対象がなかった場合は 404
          return this.controller.deleteError(res)();
        }
        else {
          return this.controller.editError(res)();
        }
      });
  }
}
