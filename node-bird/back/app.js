const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const db = require("./models");
const passportConfig = require("./passport");
const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const postsRouter = require("./routes/posts")
const app = express()

db.sequelize.sync();
passportConfig();

app.use(morgan("dev"))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use("/", express.static("uploads")); // "/"는 front에서 접근할 주소, uploads 폴더안에 들어있는 주소를 uploads 로 바꿔치기, 보안때문에 해야함
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('cookiesecret'))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "cookiesecret",
  cookie: {
    httpOnly: true,
    secure: false,
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  res.send("안녕 ㅇㅇ원석")
})

app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/posts", postsRouter)

app.listen(3085, () => {
  console.log(`백엔드 서버 3085번 포트에서 작동중`);
})