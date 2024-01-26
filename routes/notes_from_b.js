// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://daiki6guitar:xBT6tbIrGJP5eUgC@test.gloelrv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// corsミドルウェアを使用
router.use(cors());

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
  } finally {
    // 接続をクローズ
    await client.close();
  }
});

module.exports = router;
