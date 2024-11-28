const { Players } = require('../../database/models/index');

const createPlayer = async (req, res) => {
  try {
    // skill convert into string 
    console.log(req.body)
    const newSkills = req.body.skill.toString();
    console.log(newSkills)
    const data = {
      name: req.body.name,
      set_id: req.body.set_id,
      skill: newSkills,
      is_sold: req.body.isSold || false,
      link: req.body.link,
      team_id: req.body.team_id || null,
    };

    const player = await Players.create(data);
    return res.withData(player, 'SET_ADDED_SUCCESSFULLY', 200);
  } catch (error) {
    return res.withError(error)
  }
};



const getPlayers = async (req, res) => {
  try {
    const players = await Players.findAll();
    return res.withData(players, 'GET_ALL_PLAYERS', 200);
  } catch (error) {
    return res.withError(error)
  }
};


const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Players.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    return res.withData(player, 'GET_SINGLE_PLAYER', 200);
  } catch (error) {
    return res.withError(error)
  }
};


const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Players.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    const { name, set_id, skill, isSold, link, team_id } = req.body;
    const data = { name, set_id, skill, isSold, link, team_id };
    await player.update(data);
    return res.withData(player, 'SET_UPDATED_SUCCESSFULLY', 200);
  } catch (error) {
    return res.withError(error)
  }
};



const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Players.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    await player.destroy();
    return res.withData(player, 'SET_DELETED_SUCCESSFULLY', 200);
  } catch (error) {
    return res.withError(error)
  }
};


module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
};
