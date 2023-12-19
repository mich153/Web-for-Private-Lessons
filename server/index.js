const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const crypto = require('crypto')
const UserModel = require("./models/Users");
const ClassModel = require("./models/Classes");
const StudentsModel = require("./models/Students");

const app = express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/school");

const ACCESS_TOKEN_KEY = crypto.randomBytes(32).toString('hex');
const REFRESH_TOKEN_KEY = crypto.randomBytes(32).toString('hex');

app.post("/createClasses", (req, res) => {
  ClassModel.create({
      age_group: req.body.ageGroup,
      classes_counter_in_age_group: req.body.classesCounter
  })
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.get('/classes', async (req,res) => {
  try {
    const data = await ClassModel.find({});
    res.send(data);
  } catch (err) {
    throw err;
  }
})

app.put('/updateClass/:id', (req, res) => {
  const id = req.params.id;
  ClassModel.findByIdAndUpdate({_id: id}, {classes_counter_in_age_group: req.body.classesCounter})
  .then(cls => res.json(cls))
  .catch(err => res.json(err))
})

app.get('/users/:type', async (req,res) => {
  try {
    const data = await UserModel.find({type: req.params.type});
    res.send(data);
  } catch (err) {
    throw err;
  }
})

app.get('/user/:id', async (req,res) => {
  try {
    const data = await UserModel.findOne({_id: req.params.id});
    res.send(data);
  } catch (err) {
    throw err;
  }
})
     
async function getUsersByUsername(u_name){
  const user = await UserModel.find({
    username: u_name
  });
  return user;
}

app.post("/createUser", (req, res) => {
  const id = new mongoose.Types.ObjectId();
  let randUser = (Math.floor(Math.random() * 9000000)+1000000).toString();
  while(getUsersByUsername(randUser).length > 0){
    randUser = (Math.floor(Math.random() * 9000000)+1000000).toString();
  }
  randpwd = (Math.floor(Math.random() * 3)*8);
  UserModel.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    type: req.body.type,
    password: id.toString().substring(randpwd,randpwd + 8), 
    username: randUser
  })
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.put("/updateUser/:id" , (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id}, {
    first_name: req.body.firstName, 
    last_name: req.body.lastName
  })
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

app.get('/students', async (req,res) => {
  try {
    const data = await StudentsModel.find({});
    res.send(data);
  } catch (err) {
    throw err;
  }
})

app.get('/studentsFromClass/:c', async (req,res) => {
  try {
    const c = req.params.c;
    const data = await StudentsModel.find({cls: c});
    res.send(data);
  } catch (err) {
    throw err;
  }
})
   
app.post("/createStudent", (req, res) => {
  StudentsModel.create({
    user: req.body.user,
    cls: req.body.ageGroup,
    class_number: req.body.classNumber,
    id: req.body.id
  })
  .then(students => res.json(students))
  .catch(err => res.json(err))
})

app.get('/student/:id', async (req,res) => {
  try {
    const data = await StudentsModel.findOne({_id: req.params.id});
    res.send(data);
  } catch (err) {
    throw err;
  }
})

app.put("/updateStudent/:id" , (req, res) => {
  const id = req.params.id;
  StudentsModel.findByIdAndUpdate({_id: id}, {
    cls: req.body.ageGroup, 
    class_number: req.body.classNumber, 
    id: req.body.id
  })
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

async function getUser(u_name, pwd){
  const user = await UserModel.find({
    username: u_name,
    password: pwd
  });
  return user;
}

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  getUser(username, password)
  .then(
    function(user) {
      if(user.length > 0){
        const accessToken = jwt.sign(
          {userId: user._id, permission: user.type}, 
          ACCESS_TOKEN_KEY,
          {expiresIn: '15m'});
        const refreshToken = jwt.sign(
          {userId: user._id, permission: user.type}, 
          REFRESH_TOKEN_KEY,
          {expiresIn: '2h'});
        res.cookie('accessToken', accessToken, {maxAge: 900000});
        res.cookie('refreshToken', refreshToken, {maxAge: 1200000, httpOnly: true, secure: true});
        return res.json({Login: true, id: user[0]._id, type: user[0].type});
      } else{
        return res.json({Login: false, Message: "Invalid username or password"});
      }
  }).catch(err => res.json(err))
})

const verifyUser = (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if(!accesstoken){
    if(renewToken(req, res)){
      return next();
    }
  } else{
    jwt.verify(accesstoken, ACCESS_TOKEN_KEY, (err, decoded) => {
      if(err){
        return res.json({valid: false, message: "Invalid Token"});
      } else{
        req.userId = decoded.userId;
        req.permission = decoded.permission;
        return next();
      }
    })
  }
}

const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  let exist = false;
  if(!refreshtoken){
    res.json({valid: false, message: "No Refresh Token"})
  } else{
    jwt.verify(refreshtoken, REFRESH_TOKEN_KEY, (err, decoded) => {
      if(err){
        res.json({valid: false, message: "Invalid Refresh Token"});
      } else{
        const accessToken = jwt.sign(
          {userId: decoded.userId, permission: user.type}, 
          ACCESS_TOKEN_KEY,
          {expiresIn: '15m'});
        res.cookie('accessToken', accessToken, {maxAge: 900000});
        exist = true;
      }
    })
  }
  return exist;
}

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({valid: true, message: "authorized"})
})

app.listen(3000, () => {
  console.log("Server is Running")
})
