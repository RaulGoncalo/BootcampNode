import animalServices from "../services/animalServices.js";

const insertAnimal = async (req, res, next) => {
    const animal = req.body;

    try {
        if (!animal.nome || !animal.tipo) {
            throw new Error("Nome e tipo são obrigatórios");
        };

        res.status(201).send(await animalServices.insertAnimal(animal));
        logger.info(`POST /animal - ${JSON.stringify(animal)}`);
    } catch (error) {
        next(error)
    }
};

const getAnimals = async (req, res, next) => {
    try {
        res.send(await animalServices.getAnimals(req.query.proprietario_id));
    } catch (error) {
        next(error)
    }
};

const getAnimal = async (req, res, next) => {
    try {
        res.send(await animalServices.getAnimal(req.params.id))
    } catch (error) {
        next(error)
    }
};

const deleteAnimal = async (req, res, next) => {
    try {
        await animalServices.deleteAnimal(req.params.id)
        res.end()
    } catch (error) {
        next(error)
    }
};

const updateAnimal = async (req, res, next) => {
    let animal = req.body;
    try {

        if (!animal.animal_id || !animal.nome || !animal.tipo) {
            throw new Error("Animal_id, nome e tipo são obrigatórios");
        };

        animal = await animalServices.updateAnimal(animal)

        if (!animal) {
            res.status(404).send("Animal não encontrado")
        }

        res.status(200).send(animal);

        logger.info(`PUT /animal - ${JSON.stringify(animal)}`);
    } catch (error) {
        next(error)
    }
};

export default {
    insertAnimal,
    getAnimals,
    getAnimal,
    deleteAnimal,
    updateAnimal,
}