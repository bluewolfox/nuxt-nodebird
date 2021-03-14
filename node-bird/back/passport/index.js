const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // req.login이 여기로 와서 사용자 정보를 세션에 저장한다.
    return done(null, user.id); // 세션에 user의 id만 저장. user로 통째로 저장하려면 user만 저장
  });
  passport.deserializeUser(async (id, done) => {
    // 라우터 전에 항상 deserializeUser가 실행된다
    try {
      const user = await db.User.findOne({
        where: { id },
        attributes: ["id", "nickname"],
      });
      return done(null, user); // req.user, req.isAuthenticated() === true
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });
  local();
};
