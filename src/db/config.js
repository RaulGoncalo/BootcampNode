import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    "postgres://bxamcohz:PpW4z6z6R3Z4JQGsmAefRA8haAdBFyB9@kesavan.db.elephantsql.com/bxamcohz",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize