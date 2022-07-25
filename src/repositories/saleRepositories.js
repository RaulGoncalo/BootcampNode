import { connect } from '../db/config.js'

const insertSale = async (sale) => {
    const connecion = await connect();

    try {
        //desta forma evita ataques com comandos SQL na consulta "SQL injection"
        const sql = "INSERT INTO sales (value, date, client_id, product_id) VALUES($1, $2, $3, $4) RETURNING *";
        const values = [sale.value, sale.date, sale.client_id, sale.product_id];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};


const getSales = async () => {
    const connecion = await connect();
    try {
        const res = await connecion.query("SELECT * FROM sales");
        return res.rows;
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const getSale = async (id) => {
    const connecion = await connect();

    try {
        const res = await connecion.query("SELECT * FROM sales WHERE sale_id = $1", [id]);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const deleteSale = async (id) => {
    const connecion = await connect();

    try {
        await connecion.query("DELETE FROM sales WHERE sale_id = $1", [id]);
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const updateSale = async (sale) => {
    const connecion = await connect();

    try {
        const sql = "UPDATE sales SET value = $1, date = $2, client_id = $3  WHERE sale_id = $4 RETURNING *";
        const values = [sale.value, sale.date, sale.client_id, sale.sale_id];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};



export default {
    insertSale,
    getSale,
    getSales,
    deleteSale,
    updateSale,
};