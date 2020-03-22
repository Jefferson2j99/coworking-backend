const Company = require('../models/Company');
const Spot = require('../models/Spot');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async store(req, res) {
    const {
      email,
      password,
      name,
      linkedin,
      logo,
      techs,
      latitude,
      longitude,
      street,
      number,
      complement,
      phone
    } = req.body;

    const companyEmail = await Company.findOne({ email });
    const companyName = await Company.findOne({ name });

    if (companyEmail) {
      return res.json({ success: false, message: 'E-mail já existe' })
    }

    if (companyName) {
      return res.json({ success: false, message: 'Nome já existe' })
    }

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    await Company.create({
      email,
      password,
      name,
      linkedin,
      logo,
      techs: techsArray,
      street,
      number,
      complement,
      phone,
      location
    });

    return res.json({ success: true, message: 'Empresa criada com sucesso!' });
  },

  async login(req, res) {
    const { email, senha } = req.body;

    const company = await Company.findOne({ email, senha });


    if (!company) {
      return res.json({ success: false, message: 'E-mail ou senha inválido!' })
    }

    return res.json({ success: true, message: 'Logado com sucesso', id: company._id })

  },

  async index(req, res) {
    const { id } = req.params;

    const company = await Company.findOne({ _id: id });

    await company.populate('spot').execPopulate();

    return res.json({ success: true, company });
  }
}