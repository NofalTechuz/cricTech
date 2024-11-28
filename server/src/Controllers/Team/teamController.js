const { Teams } = require('../../database/models/index');



const addTeam = async (req, res) => {
    try {
        const { name, color_1, color_2 } = req.body;
        const team = await Teams.create({ name, color_1, color_2 });
        return res.withData(team, 'SET_ADDED_SUCCESSFULLY', 200);
    } catch (error) {
        return res.withError(error);
    }
};


const getTeams = async (req, res) => {
    try {
        const teams = await Teams.findAll();
        return res.withData(teams, 'GET_ALL_TEAMS', 200);
    } catch (error) {
        return res.withError(error);
    }
};


const getSingleTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const team = await Teams.findByPk(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        return res.withData(team, 'GET_SINGLE_TEAM', 200);
    } catch (error) {
        return res.withError(error);
    }
};


const deleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const team = await Teams.findByPk(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        await team.destroy();
        return res.withData(team, 'SET_DELETED_SUCCESSFULLY', 200);
    } catch (error) {
        return res.withError(error);
    }
};


const updateTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const team = await Teams.findByPk(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        const { name, color_1, color_2 } = req.body;
        const data = { name, color_1, color_2 };
        await team.update(data);
        return res.withData(team, 'SET_UPDATED_SUCCESSFULLY', 200);
    } catch (error) {
        return res.withError(error);
    }
};



module.exports = {
    addTeam,
    getTeams,
    getSingleTeam,
    deleteTeam,
    updateTeam
};