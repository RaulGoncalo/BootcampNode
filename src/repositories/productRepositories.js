import { connect } from '../db/config.js'

const insertProduct = async (product) => {
    const connecion = await connect();

    try {
        //desta forma evita ataques com comandos SQL na consulta "SQL injection"
        const sql = "INSERT INTO products (name, description, value, stock, supplier_id) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [product.name, product.description, product.value, product.stock, product.supplier_id];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};


const getProducts = async () => {
    const connecion = await connect();
    try {
        const res = await connecion.query("SELECT * FROM products");
        return res.rows;
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const getProduct = async (id) => {
    const connecion = await connect();

    try {
        const res = await connecion.query("SELECT * FROM products WHERE product_id = $1", [id]);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const deleteProduct = async (id) => {
    const connecion = await connect();

    try {
        await connecion.query("DELETE FROM products WHERE product_id = $1", [id]);
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};

const updateProduct = async (product) => {
    const connecion = await connect();

    try {
        const sql = "UPDATE products SET name = $1, description = $2, value = $3, stock = $4, supplier_id = $5 WHERE product_id = $6 RETURNING *";
        const values = [product.name, product.description, product.value, product.stock, product.supplier_id, product.product_id];
        const res = await connecion.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        connecion.release();
    }
};



export default {
    insertProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
};