import Owner from '../models/ownerModels.js';
import Animal from '../models/animalModels.js';

const insertAnimal = async (animal) => {
    try {
        return await Animal.create(animal);
    } catch (error) {
        throw error
    }
};

const getAnimals = async () => {
    try {
        return await Animal.findAll();
    } catch (error) {
        throw error
    }
};

const getAnimalsByProprietarioId = async (proprietarioId) => {
    try {
        return await Animal.findAll({
            where: {
                proprietarioId,
            },
            include: {
                model: Owner,
            }
        })
    } catch (error) {
        throw error
    }
};

const getAnimal = async (id) => {
    try {
        return await Animal.findByPk(id);
    } catch (error) {
        throw error
    }
};

const deleteAnimal = async (id) => {
    try {
        await Animal.destroy({
            where: {
                animalId: id
            }
        });
    } catch (error) {
        throw error
    }
};

const updateAnimal = async (animal) => {
    try {
        Animal.update(animal, {
            where: {
                animalId: animal.animalId
            }
        });

        return await getAnimal(animal.animalId);
    } catch (error) {
        throw error
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