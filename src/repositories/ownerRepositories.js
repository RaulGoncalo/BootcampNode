import Owner from "../models/ownerModels.js";

const insertOwner = async (owner) => {
    try {
        return await Owner.create(owner);
    } catch (error) {
        throw error
    }
};

const getOwners = async () => {
    try {
        return await Owner.findAll();
    } catch (error) {
        throw error
    }
};

const getOwner = async (id) => {
    try {
        return await Owner.findByPk(id);
    } catch (error) {
        throw error
    }
};

const deleteOwner = async (id) => {
    try {
        return await Owner.destroy({
            where: {
                proprietarioId: id
            }
        });
    } catch (error) {
        throw error
    }
};

const updateOwner = async (owner) => {
    try {
        await Owner.update(owner, {
            where: {
                proprietarioId: owner.proprietarioId
            }
        });

        return await getOwner(owner.proprietarioId)
    } catch (error) {
        throw error
    }
};

export default {
    insertOwner,
    getOwners,
    getOwner,
    deleteOwner,
    updateOwner
}