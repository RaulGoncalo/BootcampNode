import db from 'pg';

const connect = async () => {
    if (global.connection) {
        return global.connection.connect();
    };

    //executado sómente uma vez
    const pool = new db.Pool({
        connectionString: "postgres://uxvbctdi:ii3H5j5M0sPIX0MQd1ItFVA1jccqu2HA@kesavan.db.elephantsql.com/uxvbctdi"
    });
    global.connection = pool;
    return pool.connect();
}

export { connect }