import { connect } from '../db/config.js'

const insertClient = async (client) => {
    const connecion = await connect();

    try {
        //desta forma evita ataques com comandos SQL na consulta "SQL injection"
        const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [client.name, client.cpf, client.phone, client.email, client.address];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};


const getClients = async () => {
    const connecion = await connect();
    try {
        const res = await connecion.query("SELECT * FROM clients");
        return res.rows;
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const getClient = async (id) => {
    const connecion = await connect();

    try {
        const res = await connecion.query("SELECT * FROM clients WHERE client_id = $1", [id]);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const deleteClient = async (id) => {
    const connecion = await connect();

    try {
        await connecion.query("DELETE FROM clients WHERE client_id = $1", [id]);
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const updateClient = async (client) => {
    const connecion = await connect();

    try {
        const sql = "UPDATE clients SET name = $1, cpf = $2, phone = $3, email = $4, address = $5 WHERE client_id = $6 RETURNING *";
        const values = [client.name, client.cpf, client.phone, client.email, client.address, client.client_id];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};



export default {
    insertClient,
    getClient,
    getClients,
    deleteClient,
    updateClient,
};