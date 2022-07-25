import { connect } from '../db/config.js'

const insertAnimal = async (animal) => {
    const cnt = await connect();
    try {
        const sql = "INSERT INTO animais (nome, tipo, proprietario_id) VALUES ($1, $2, $3) RETURNING *";
        const values = [animal.nome, animal.tipo, animal.proprietario_id];
        const res = await cnt.query(sql, values);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const getAnimals = async () => {
    const cnt = await connect();
    try {
        const res = await cnt.query("SELECT * FROM animais");
        return res.rows;
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const getAnimalsByProprietarioId = async (proprietarioId) => {
    const cnt = await connect();
    try {
        const res = await cnt.query("SELECT * FROM animais WHERE proprietario_id = $1", [proprietarioId]);
        return res.rows;
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const getAnimal = async (id) => {
    const cnt = await connect();
    try {
        const res = await cnt.query("SELECT * FROM animais WHERE animal_id = $1", [id]);

        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const deleteAnimal = async (id) => {
    const cnt = await connect();
    try {
        await cnt.query("DELETE FROM animais WHERE animal_id = $1", [id]);
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

const updateAnimal = async (animal) => {
    const cnt = await connect();
    try {
        const sql = "UPDATE animais SET nome = $1, tipo = $2, proprietario_id = $3 WHERE animal_id = $4 RETURNING *";
        const values = [animal.nome, animal.tipo, animal.proprietario_id, animal.animal_id];
        const res = await cnt.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error
    } finally {
        cnt.release();
    }
};

export default {
    insertAnimal,
    getAnimals,
    getAnimalsByProprietarioId,
    getAnimal,
    deleteAnimal,
    updateAnimal
}