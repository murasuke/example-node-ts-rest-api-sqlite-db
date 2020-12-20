import Model from "./model";
import UserEntity from "../entities/user-entity";

export default class UserModel{
    model: Model;

    constructor(){
        this.model = new Model();
    }
    
    async findAll(){
        const sql = "SELECT id, name, age FROM user";

        const rows: any[] = await this.model.findAll(sql);
        const users: UserEntity[] = [];
        for( const row of rows){
            users.push( new UserEntity(row.id, row.name, row.age));
        }
        return users;
    }


    async findById(id: number){
        const sql = "SELECT id, name, age FROM user WHERE id = $id";

        const params = {
            $id: id
        }

        const row = await this.model.findOne(sql, params);
        return new UserEntity(row.id, row.name, row.age);     
    }

    async create(user: UserEntity) {
        // ID は自動採番させる
        const sql = `
          INSERT INTO user (
              name,
              age
          ) VALUES (
              $name,
              $age
          )
        `;
        const params = {
          $name: user.name,
          $age : user.age
        };
        
        const id = await this.model.run(sql, params)         
        // 登録したデータを返却する
        return this.findById(id);
   
    }

    async update(user: UserEntity) {
        const sql = `
          REPLACE INTO user (
              id,
              name,
              age
          ) VALUES (
              $id,
              $name,
              $age
          )
        `;
        const params = {
          $id  : user.id,
          $name: user.name,
          $age : user.age
        };
        
        return await this.model.run(sql, params);
      }
      
      /**
       * 削除する
       * 
       * @param id ID
       * @return 削除できたら Resolve する
       */
      async delete(id: number) {
        const sql = `
          DELETE FROM
              user
          WHERE
              id = $id
        `;
        const params = {
          $id: id
        };
        
        return await this.model.run(sql, params);
      }
}