import ownerRepositories from "../repositories/ownerRepositories.js";
import animalRepositories from "../repositories/animalRepositories.js";

const insertOwner = async (owner) => {
    return await ownerRepositories.insertOwner(owner);
};

const getOwners = async () => {
    return await ownerRepositories.getOwners();
};

const getOwner = async (id) => {
    return await ownerRepositories.getOwner(id);
};

const deleteOwner = async (id) => {
    const animals = await animalRepositories.getAnimals();
    const index = animals.findIndex(animal => animal.proprietario_id == id)

    if (index >= 0) {
        throw new Error("Exclusão não permitida, proprietario com animais cadastrados")
    }
    await ownerRepositories.deleteOwner(id);
};

const updateOwner = async (owner) => {
    return await ownerRepositories.updateOwner(owner);
};

export default {
    insertOwner,
    getOwners,
    getOwner,
    deleteOwner,
    updateOwner
};