const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
   console.log("customers API");

   res.send({
    customer: [{
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
  ]});
      
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));