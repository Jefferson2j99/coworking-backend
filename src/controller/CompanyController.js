const Company = require("../models/Company");
const Spot = require("../models/Spot");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async createCompany(req, res) {
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
      return res.json({ success: false, message: "Este e-mail já existe!" });
    }

    if (companyName) {
      return res.json({ success: false, message: "Este nome já existe!" });
    }

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
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

    return res.json({ success: true, message: "Empresa criada com sucesso!" });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const company = await Company.findOne({ email, password }).populate(
      "spots"
    );

    if (!company) {
      return res.json({ success: false, message: "E-mail ou senha inválido!" });
    }

    return res.json({
      success: true,
      message: "Logado com sucesso",
      company
    });
  },

  async findCompanyById(req, res) {
    const { id } = req.params;

    const company = await Company.findById(id).populate("spots");

    if (!company) {
      return res.json({ success: false, message: "Empresa não existe!" });
    }

    return res.json({ success: true, company });
  }
};
