import {db} from "../db/db";
import ModelError from "./model-error";

export default class Model{
    findAll(sql:string): Promise<any[]> {
        return new Promise((resolve, reject) => {
          db.all(sql, (error: Error, rows: any[]) => {
            if(error) {
              reject(new ModelError(20, 'Internal Server Error'));
            }
            else if(rows === null || rows.length === 0) {
              reject(new ModelError(21, 'Entity Not Found'));
            }
            else {
              resolve(rows);
            }
          });
        });
      }
      

      findOne(sql: string, params: {$id: number}): Promise<any> {
        return new Promise((resolve, reject) => {
          const stmt = db.prepare(sql);
          
          stmt.all(params, (error, rows) => {
            if(error) {
              reject(new ModelError(11, 'Invalid Arguments'));
            }
            else if(rows === null || rows.length === 0) {
              reject(new ModelError(21, 'Entity Not Found'));
            }
            else {
              const row = rows[0];
              resolve(row);
            }
          });
        });
      }

    run(sql: string, params: any): Promise<number> {
        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);

            // bind() して this を書き換えているのでアロー関数を使わない
            stmt.run(params, function (error) {
                if (this.changes === 1) {
                    // lastID は INSERT 時のみ ID を返す
                    resolve(this.lastID);
                }
                else if (this.changes === 0) {
                    reject(new ModelError(21, 'Entity Not Found'));
                }
                else {
                    reject(new ModelError(11, 'Invalid Arguments'));
                }
            });
        });
    }
}


