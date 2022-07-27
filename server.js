const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;
const db = require('./server/config/db')
const multer = require('multer');
const upload = multer({dest: './upload'});
const config = require('./server/config/key');
const {auth} = require('./server/middleware/auth');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


// db.connect(config.mongoURI,{
//   useNewUrlParser: true, useUnifiedTopology: true
//   // 안쓰면 에러 발생할 수 있음
// }).then(() => console.log('DB Connected...')).catch(err => console.log(err));


app.get('/api/customers', (req, res) => {
   console.log("customers API");

   res.send({
  
    customers: [{
      'id':1,
      'image' : 'https://placeimg.com/64/64/1',
      'name' : '홍길동',
      'birthday' : '111111',
      'gender' : '남자',
      'job' : '대학생'
    },
    {
      'id':2,
      'image' : 'https://placeimg.com/64/64/2',
      'name' : '홍길동',
      'birthday' : '222222',
      'gender' : '남자',
      'job' : '프로그래머'
    }
    ,{
      'id':3,
      'image' : 'https://placeimg.com/64/64/3',
      'name' : '홍길동',
      'birthday' : '333333',
      'gender' : '남자',
      'job' : '디자이너'
    }
    ,{
      'id':4,
      'image' : 'https://placeimg.com/64/64/4',
      'name' : '홍길동',
      'birthday' : '444444',
      'gender' : '여자',
      'job' : '디자이너'
    }
    ,{
      'id':4,
      'image' : 'https://placeimg.com/64/64/4',
      'name' : '홍길동',
      'birthday' : '444444',
      'gender' : '여자',
      'job' : '디자이너'
    }
    ,{
      'id':4,
      'image' : 'https://placeimg.com/64/64/4',
      'name' : '홍길동',
      'birthday' : '444444',
      'gender' : '여자',
      'job' : '디자이너'
    }
    ,{
      'id':4,
      'image' : 'https://placeimg.com/64/64/4',
      'name' : '홍길동',
      'birthday' : '444444',
      'gender' : '여자',
      'job' : '디자이너'
    }
    ,{
      'id':4,
      'image' : 'https://placeimg.com/64/64/4',
      'name' : '홍길동',
      'birthday' : '444444',
      'gender' : '여자',
      'job' : '디자이너'
    }
    ,{
      'id':4,
      'image' : 'https://placeimg.com/64/64/4',
      'name' : '홍길동',
      'birthday' : '444444',
      'gender' : '여자',
      'job' : '디자이너'
    }
  ]});
      
});



app.get('/api/user', (req, res) => {
  db.query('SELECT * FROM user WHERE isDeleted = 0', (err, data) => {
    if(!err) res.send({ customers : data});
    else res.send(err);
  })
})

app.get('/api/searchPage', (req, res) => {
  db.query('SELECT * FROM masktable ORDER BY 1 DESC', (err, data) => {
    if(!err) res.send({ history : data});
    else res.send(err);
  })
})

app.get('/api/device', (req, res) => {
  db.query('SELECT * FROM device WHERE isDeleted = 0 ORDER BY seq DESC', (err, data) => {
    if(!err) res.send({ device : data});
    else res.send(err);
  })
})

app.use('/image',express.static('./upload'));

app.post('/api/user', upload.single('image'),(req,res) =>{
  let sql  = "INSERT INTO user VALUES ( null, ?, ?, ?, ?, ?, now(), 0)";
  //console.log(req);
  let image = (req.file === undefined ? 'null': ('http://localhost:5001/image/' + req.file.filename));
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [name, image , birthday, gender, job];
  db.query(sql, params, 
    (err, rows, fields) =>{
      res.send(rows);
      console.log(rows);
    })
})

app.post('/api/device', upload.single('image'),(req,res) =>{
  let sql  = "INSERT INTO device VALUES ( ?, ?, ?, null, 0, now())";
  //console.log(req);
  let devicename = req.body.devicename;
  let serial = req.body.serial;
  let addr = req.body.addr;
  let params = [devicename, serial, addr];
  db.query(sql, params, 
    (err, rows, fields) =>{
      res.send(rows);
      if(err){
        console.log(err);
      }
      console.log(rows);
    })
})

// 손봐야함 쿼리 !!
app.post('/api/searchPage', upload.single('image'),(req,res) =>{
  let sql =  "INSERT INTO masktable VALUES ( null, ?, ?, ?, ?, ?, now(), 0)";
  let image = (req.file === undefined ? 'null': ('http://localhost:5001/image/' + req.file.filename));
  let name = req.body.name;
  let params = [name, image , birthday, gender, job];
  db.query(sql, params, 
    (err, rows, fields) =>{
      res.send(rows);
    })
})

app.delete('/api/user/:seq', (req,res) =>{
  let sql = 'UPDATE user SET isDeleted = 1 WHERE seq = ?';
  let params = [req.params.seq];
  db.query(sql, params,(
    (err, rows, fields) => {
      res.send(rows);
    }
  ))
})

app.delete('/api/device/:seq', (req,res) =>{
  let sql = 'UPDATE device SET isDeleted = 1 WHERE seq = ?';
  let params = [req.params.seq];
  db.query(sql, params,(
    (err, rows, fields) => {
      res.send(rows);
    }
  ))
})
app.listen(port, ()=> console.log(`Listening on port ${port}`));