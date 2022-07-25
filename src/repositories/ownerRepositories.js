import { connect } from '../db/config.js'

const insertOwner = async (owner) => {
    const cnt = await connect();
    try {
        const sql = "INSERT INTO proprietarios (nome, telefone) VALUES ($1, $2) RETURNING *";
        const values = [owner.nome, owner.telefone];
        const res = await cnt.query(sql, values);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const getOwners = async () => {
    const cnt = await connect();
    try {
        const res = await cnt.query("SELECT * FROM proprietarios");
        return res.rows;
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const getOwner = async (id) => {
    const cnt = await connect();
    try {
        const res = await cnt.query("SELECT * FROM proprietarios WHERE proprietario_id = $1", [id]);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const deleteOwner = async (id) => {
    const cnt = await connect();
    try {
        await cnt.query("DELETE FROM proprietarios WHERE proprietario_id = $1", [id]);
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const updateOwner = async (owner) => {
    const cnt = await connect();
    try {
        const sql = "UPDATE proprietarios SET nome = $1, telefone = $2 WHERE proprietario_id = $3 RETURNING *";
        const values = [owner.nome, owner.telefone, owner.proprietario_id];
        const res = await cnt.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

export default {
    insertOwner,
    getOwners,
    getOwner,
    deleteOwner,
    updateOwner
}