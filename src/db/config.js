import db from 'pg';

const connect = async () => {
    if (global.connection) {
        return global.connection.connect();
    };

    //executado sómente uma vez
    const pool = new db.Pool({
        connectionString: "postgres://bxamcohz:PpW4z6z6R3Z4JQGsmAefRA8haAdBFyB9@kesavan.db.elephantsql.com/bxamcohz"
    });
    global.connection = pool;
    return pool.connect();
}

export { connect }