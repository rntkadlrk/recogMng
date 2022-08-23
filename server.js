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


app.get('/api/user', (req, res) => {
  db.query('SELECT * FROM user WHERE isDeleted = 0', (err, data) => {
    if(!err) res.send({ customers : data});
    else res.send(err);
  })
})

app.get('/api/searchPage', (req, res) => {
  db.query('select m.seq, m.imageRoute, m.name, m.maskDetect, m.temperature, m.frameDate, m.frameTime, d.addr from masktable m inner join device d where m.serial = d.serial and d.isDeleted = 0 order by m.frameDate ', (err, data) => {
    if(!err) {console.log("정상요청"); res.send({ history : data});}
    else res.send(err);
  })
})

app.post('/api/searchPage', upload.single('image'),(req,res) =>{
  console.log("요청 받음");
  let sql =  "select m.seq, m.imageRoute, m.name, m.maskDetect, m.temperature, m.frameDate, m.frameTime, d.addr " +
  "from masktable m inner join device d " + 
  "where m.serial = d.serial and d.isDeleted = 0 and m.name like ? and frameDate between ? and ? " + 
  "order by m.frameDate and m.frameTime";
  //let image = (req.files === undefined ? 'null': ('http://localhost:5001/image/' + req.files.filename));
  let route = req.body.route;
  let name = req.body.name;
  let fdate = req.body.fromDate;
  let tdate = req.body.toDate;
  let params = ['%'+name+'%', fdate, tdate];;

  //console.log(route); // 잘받음. 배열로 왔을 경우 어떻게 처리할지 짜면 끝
  if(route){
    const arrFaceLength = route.length;
    sql = "SELECT m.seq, m.imageRoute, m.name, m.maskDetect, m.temperature, m.frameDate, m.frameTime, d.addr from masktable m inner join device d where m.serial = d.serial and d.isDeleted = 0 and imageRoute in (" 
    //console.log(name);
    route.map((rows, index) => {
      sql += "'" + rows +"'"

      if(arrFaceLength === index+1){
        sql += ") and "
        if(!name == ''){
          sql += "m.name like ? and "
        }else{
          params = [fdate, tdate];
        }
        sql +="frameDate between ? and ? order by m.frameDate and m.frameTime "
      }else{
        sql += ", "
      }

    })
   console.log(sql)
   console.log(params)
   db.query(sql, params, 
    (err, data, fields) =>{
      res.send({ history : data})
      if(err){
        console.log(err);
      };
    })
  }else{
    db.query(sql, params, 
      (err, data, fields) =>{
        res.send({ history : data})
        if(err){
          console.log(err);
        };
      })
  }
 
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
      //console.log(rows);
    })
})

// 손봐야함 쿼리 !!
// app.post('/api/searchPage', upload.single('image'),(req,res) =>{
//   let sql =  "INSERT INTO masktable VALUES ( null, ?, ?, ?, ?, ?, now(), 0)";
//   let image = (req.file === undefined ? 'null': ('http://localhost:5001/image/' + req.file.filename));
//   let name = req.body.name;
//   let params = [name, image , birthday, gender, job];
//   db.query(sql, params, 
//     (err, rows, fields) =>{
//       res.send(rows);
//     })
// })



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