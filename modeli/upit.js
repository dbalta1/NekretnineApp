const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const upit = sequelize.define(
    "Upit",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tekst_upita: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return upit;
};
