import sqlite3 from "sqlite3";
import path from "path";

/** DB ファイルを生成 or 取得する */
//export const db = new (sqlite3.verbose().Database)("./app/db/sqlite3-database.db");

export let db: sqlite3.Database;
export const init = () => {
    const dbpath = path.resolve(__dirname, "sqlite3-database.db");
    // db = new (sqlite3.verbose().Database)("./app/db/sqlite3-database.db");
    db = new (sqlite3.verbose().Database)(dbpath);
    db.run(`
    CREATE TABLE IF NOT EXISTS user (
        id    INTEGER  PRIMARY KEY  AUTOINCREMENT,
        name  TEXT,
        age   INTEGER
      )
    `);
};

