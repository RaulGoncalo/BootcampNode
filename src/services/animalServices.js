import animalRepositories from "../repositories/animalRepositories.js";

const insertAnimal = async (animal) => {
    return await animalRepositories.insertAnimal(animal);
};

const getAnimals = async (proprietarioId) => {
    if (proprietarioId) {
        return await animalRepositories.getAnimalsByProprietarioId(proprietarioId);
    };

    return await animalRepositories.getAnimals();
};

const getAnimal = async (id) => {
    return await animalRepositories.getAnimal(id);
};

const deleteAnimal = async (id) => {
    await animalRepositories.deleteAnimal(id);
};

const updateAnimal = async (animal) => {
    return await animalRepositories.updateAnimal(animal);
};

export default {
    insertAnimal,
    getAnimals,
    getAnimal,
    deleteAnimal,
    updateAnimal
};