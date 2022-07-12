const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;
const db = require('./server/config/db')
const multer = require('multer');
const upload = multer({dest: './upload'})
const imageCompression = require('browser-image-comression');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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



app.get('/api/test', (req, res) => {
  db.query('SELECT * FROM maskTable WHERE isDeleted = 0', (err, data) => {
    if(!err) res.send({ customers : data});
    else res.send(err);
  })
})

app.use('/image',express.static('./upload'));
app.post('/api/test', upload.single('image'),(req,res) =>{
  let sql  = "INSERT INTO masktable VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = 'http://localhost:5001/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [name, image , birthday, gender, job];
  db.query(sql, params, 
    (err, rows, fields) =>{
      res.send(rows);
    })
})

app.delete('/api/customers/:seq', (req,res) =>{
  let sql = 'UPDATE masktable SET isDeleted = 1 WHERE seq = ?';
  let params = [req.params.seq];
  db.query(sql, params,(
    (err, rows, fields) => {
      res.send(rows);
    }
  ))
})
app.listen(port, ()=> console.log(`Listening on port ${port}`));