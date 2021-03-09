const passport = require('passport');
const { Strategy: LocalStrategy } = require("passport-local")
const db = require("../models")
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: "email", // req.body.email
    passwordField: "password" // req.body.password
  }, async (email, password, done) => { // done = 콜백 함수
    try {
      const exUser = await db.User.findOne({ where: { email } })
      if (!exUser) {
        return done(null, false, { reason: "존재하지 않는 사용자입니다." })
      }
      const result = await bcrypt.compare(password, exUser.password) // bcrypt.compare은 둘의 값을 비교한다.
      if (result) { // 로그인 성공
        return done(null, exUser);
      } else {
        return done(null, false, { reason: "비밀번호가 틀립니다." })
      }
    } catch (error) {
      console.error(error);
      return done(error)
    }
  }));
}