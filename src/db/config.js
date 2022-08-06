//import db from 'pg';
import { Sequelize } from 'sequelize';

/*const connect = async () => {
    if (global.connection) {
        return global.connection.connect();
    };

    //executado sómente uma vez
    const pool = new db.Pool({
        connectionString: "postgres://uxvbctdi:ii3H5j5M0sPIX0MQd1ItFVA1jccqu2HA@kesavan.db.elephantsql.com/uxvbctdi"
    });
    global.connection = pool;
    return pool.connect();
}*/

const sequelize = new Sequelize(
    "postgres://zwuhkpvc:2Es43QtzzKfmwaPNNnenwbegqBxOIuZ4@kesavan.db.elephantsql.com/zwuhkpvc",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize 