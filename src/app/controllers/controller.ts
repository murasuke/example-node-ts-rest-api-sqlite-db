import express from "express";

/**
 * Controller : 共通処理
 */
export default class Controller {
    /**
     * 取得系の成功時処理
     * 
     * @param res レスポンス
     * @return レスポンス
     */
    findSuccess(res: any) {
      return (result:any ) => {
        res.status(200);  // OK
        res.json(result);
      };
    }
    
    /**
     * 取得系の失敗時処理
     * 
     * @param res レスポンス
     * @return レスポンス
     */
    findError(res: any) {
      return (error: any) => {
        res.status(404);  // Not Found
        res.json(error);
      };
    }
    
    /**
     * 登録の成功時処理
     * 
     * @param res レスポンス
     * @return レスポンス
     */
    createSuccess(res: any) {
      return (result: any) => {
        res.status(200);
        res.json(result);
      };
    }
    
    /**
     * 削除対象がない場合の失敗時処理
     * 
     * @param res レスポンス
     * @return レスポンス
     */
    deleteError(res: any) {
      return (error?: any) => {
        res.status(404);  // Not Found
        res.json(error);
      };
    }
    
    /**
     * 更新・削除の成功時処理
     * 
     * @param res レスポンス
     * @return レスポンス
     */
    editSuccess(res: any) {
      return (result: any) => {
        res.status(204);  // No Content
        res.json(result);
      };
    }
    
    /**
     * 登録・更新・削除の失敗時処理
     * 
     * @param res レスポンス
     * @return レスポンス
     */
    editError(res: any) {
      return (error?: any) => {
        res.status(500);  // Internal Server Error
        res.json(error);
      };
    }
  }
  