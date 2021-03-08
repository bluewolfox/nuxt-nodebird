module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(3100),
      allowNull: false
    },
    // createdAt, updatedAt 이 자동으로 생긴다.
  }, {
    charset: "utf8",
    collate: "utf8_general_ci" // 한글 저장
  });
  User.associate = (db) => {

  };
  return User;
}