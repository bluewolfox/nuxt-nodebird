const express = require('express');
const db = require("./models");
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt');

db.sequelize.sync();

app.use(cors("http://localhost:3000"));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send("안녕 ㅇㅇ원석")
})

app.post("/user", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12)
    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname,
    })
    // HTTP STATUS CODE
    res.status(201).json({
      message: "회원가입 성공!",
      data: newUser
    });
  } catch (error) {
    console.error(error);
    next(error)
  }
})

app.listen(3085, () => {
  console.log(`백엔드 서버 3085번 포트에서 작동중`);
})