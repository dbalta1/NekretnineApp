const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const Korisnik = sequelize.define(
    "Korisnik",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prezime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Korisnik;
};
