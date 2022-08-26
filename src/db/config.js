import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://bywovqie:N89H9QbUU5XAg3vR4JAioN_-fvL3HdRB@kesavan.db.elephantsql.com/bywovqie",
  {
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

export default sequelize;
