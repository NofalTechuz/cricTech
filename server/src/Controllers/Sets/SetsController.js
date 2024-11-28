const { Sets } = require('../../database/models/index');

// Add Advertisement Service

const addSetService = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
        };
        // sequelize
        const set = await Sets.create(data);
        return res.withData(set, 'SET_ADDED_SUCCESSFULLY', 200);
    } catch (error) {
        console.log(error);
        return res.withError(error);
    }
};

const getSetsService = async (req, res) => {
    try {
        const sets = await Sets.findAll();
        return res.withData(sets, 'GET_ALL_SETS', 200);
    } catch (error) {
        console.log(error);
        return res.withError(error);
    }
};


const getSingleSetService = async (req, res) => {
    try {
        const id = req.params.id;
        const sets = await Sets.findAll({ where: { id } });
        return res.withData(sets, 'GET_SINGLE_SET', 200);
    } catch (error) {
        console.log(error);
        return res.withError(error);
    }
};



const updateSetService = async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
        };
        // sequelize
        const set = await Sets.update(data, { where: { id } });
        return res.withData(set, 'SET_UPDATED_SUCCESSFULLY', 200);
    } catch (error) {
        console.log(error);
        return res.withError(error);
    }
};


const deleteSetService = async (req, res) => {
    try {
        const id = req.params.id;
        const set = await Sets.destroy({ where: { id } });
        return res.withData(set, 'SET_DELETED_SUCCESSFULLY', 200);
    } catch (error) {
        console.log(error);
        return res.withError(error);
    }
};

module.exports = {

    addSetService,
    getSetsService,
    getSingleSetService,
    updateSetService,
    deleteSetService
};
