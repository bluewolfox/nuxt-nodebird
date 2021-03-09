module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true //중복금지
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    // createdAt, updatedAt 이 자동으로 생긴다.
  }, {
    charset: "utf8",
    collate: "utf8_general_ci" // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)
  };
  return User;
}