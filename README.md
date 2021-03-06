# node-ts-rest-api-sqlite-db : Node.js + Express + REST API + SQLite DB Example.

Express で REST API を構築し、SQLite でデータ永続化を実現した、Node.js オンリーで作った Web API サーバのデモ。
https://github.com/Neos21/example-node-js-rest-api-sqlite-db
をTypescriptで再実装。


## 使い方

```sh
$ npm install
$ npm tsc
$ npm start

サーバ起動 : http://localhost:3000/
```

サンプルとして、ユーザ情報を扱う `Users` という API を用意している。それぞれ、以下のメソッド・URL を指定して参照・操作できる。

| 機能                 | メソッド | URL                                 |
|----------------------|----------|-------------------------------------|
| 全件取得             | GET      | `http://localhost:3000/api/users/`  |
| ID を指定して1件取得 | GET      | `http://localhost:3000/api/users/1` |
| 新規登録             | POST     | `http://localhost:3000/api/users/`  |
| ID を指定して更新    | PUT      | `http://localhost:3000/api/users/1` |
| ID を指定して削除    | DELETE   | `http://localhost:3000/api/users/1` |

`./test/` 配下の各ファイルはこれらの API を叩く Node.js スクリプトなので、`$ npm start` でサーバ起動後、`$ node ./test/user-find-all-test.js` というように実行してみてほしい。

※/test は未実装。jest等で実行できるように検討中

## 構造

ディレクトリ構成は以下のとおり。

```
node-js-rest-api-sqlite-db/
├ README.md                    説明ファイル
├ package.json                 利用する npm パッケージなどの情報
├ index.ts                     エントリポイント。サーバの起動と DB の準備を行う
├ app/                         サーバ・DB を動作させるためのファイルは全てこの中
│ ├ db/                       DB (SQLite) 関連のファイルを置くディレクトリ
│ │ ├ db.ts                  DB ファイルの生成とテーブル定義の準備を行う
│ │ └ sqlite3-database.db    サーバを起動すると db.js により生成される
│ ├ routes/                   ルータ関連のディレクトリ
│ │ ├ router.ts              API 別のルータの登録などを行うベースルータ
│ │ └ users-router.ts        Users に関するルーティングの定義
│ ├ controllers/              ルータから呼ばれるコントローラクラスを置くディレクトリ
│ │ ├ controller.ts          各コントローラクラスで共通的に利用する処理をまとめたクラス
│ │ └ users-controller.ts    Users に関するコントローラ
│ ├ models/                   DB 接続を行うクラス (DAO) を置くディレクトリ
│ │ ├ model.ts               各モデルクラスで共通的に利用する処理をまとめたクラス
│ │ ├ model-error.ts         DB 操作時のエラー情報を保持するためのオブジェクト
│ │ └ user-model.ts          Users に関するモデル
│ └ entities/                 コントローラ・モデル間でデータをやり取りする際のクラス (DTO) を置くディレクトリ
│    └ user-entity.ts         Users に関するエンティティ
└ test/                        サーバにリクエストを投げてテストするための Node.js スクリプト ※未移行
   ├ user-find-all-test.js     Users の全件取得を行う
   ├ user-find-by-id-test.js   Users の ID を指定して1件取得を行う
   ├ user-create-test.js       Users にデータを新規登録する
   ├ user-update-test.js       Users のデータを更新する
   └ user-delete-test.js       Users のデータを削除する
```

`index.js` がエントリポイント。サーバを起動し、`db.js` にDB ファイルを用意させ、`router.js` を呼び出してルーティングの定義を行わせる。

特定の URL にアクセスすると、Router から Controller が呼び出される。Controller でリクエスト情報が整理され、DB 操作を行う Model クラスが呼び出される。Controller と Model 間のデータやり取りのために、Entity クラスを利用している。

`Users` 以外の API を作る場合は、

- `db.js` … `CREATE TABLE` 文の追加
- Router … API 別のルータの作成と `router.js` への追加
- Controller … 共通処理は `controller.js` を利用
- Model … 共通処理は `model.js` を利用
- Entity

を用意することで、`Users` と同じように動作させられる。


## thanks to

- [Neo's World](https://neos21.net/)