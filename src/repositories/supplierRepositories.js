import { connect } from '../db/config.js'

const insertSupplier = async (supplier) => {
    const connecion = await connect();

    try {
        //desta forma evita ataques com comandos SQL na consulta "SQL injection"
        const sql = "INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};


const getSuppliers = async () => {
    const connecion = await connect();
    try {
        const res = await connecion.query("SELECT * FROM suppliers");
        return res.rows;
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const getSupplier = async (id) => {
    const connecion = await connect();

    try {
        const res = await connecion.query("SELECT * FROM suppliers WHERE supplier_id = $1", [id]);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const deleteSupplier = async (id) => {
    const connecion = await connect();

    try {
        await connecion.query("DELETE FROM suppliers WHERE supplier_id = $1", [id]);
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const updateSupplier = async (supplier) => {
    const connecion = await connect();

    try {
        const sql = "UPDATE suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 WHERE supplier_id = $6 RETURNING *";
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address, supplier.supplier_id];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};



export default {
    insertSupplier,
    getSupplier,
    getSuppliers,
    deleteSupplier,
    updateSupplier,
};