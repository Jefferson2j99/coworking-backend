const User = require('../models/Users');
const Company = require('../models/Company');

module.exports = {
  async createUser(req, res) {
    const { name, email, password, phone, techs } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ sucess: false, message: 'Usuário já existe.' });
    }

    await User.create({
      name,
      email,
      password,
      phone,
      techs: techs.split(",").map(tech => tech.trim())
    });

    return res.status(200).json({ sucess: true, message: 'Usuário criado com sucesso.' })
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ sucess: false, message: 'Usuário não existe.' });
    }

    if (user.password !== password) {
      return res.status(400).json({ sucess: false, message: 'Senha inválida.' });
    }

    return res.status(200).json({ sucess: true, message: 'Usuário logado com sucesso.', user });
  },

  async getCompaniesByTechs(req, res) {
    const { tech } = req.query;

    const companies = await Company.find({ techs: tech });

    return res.json(companies);
  },
}