var express = require('express');
var router = express.Router();

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://daiki6guitar:xBT6tbIrGJP5eUgC@test.gloelrv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
  try {
    // MongoDB クライアントが接続されるまで待機
    await client.connect();

    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // 全てのドキュメントを取得
    const note = await notes.find({}).toArray();

    res.json(note);
  } catch (error) {
    console.error("エラーが発生しました:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // 接続をクローズ
    await client.close();
  }
});

module.exports = router;
