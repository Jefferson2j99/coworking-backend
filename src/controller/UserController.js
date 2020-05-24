const User = require("../models/Users");
const Company = require("../models/Company");

module.exports = {
  async createUser(req, res) {
    const { name, email, password, phone, techs } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Usuário já existe." });
    }

    await User.create({
      name,
      email,
      password,
      phone,
      techs: techs.split(",").map((tech) => tech.trim()),
    });

    return res
      .status(200)
      .json({ sucess: true, message: "Usuário criado com sucesso." });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Usuário não existe." });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Senha inválida." });
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Usuário logado com sucesso.", user });
  },

  async getCompaniesByName(req, res) {
    const { companyName } = req.params;

    const companies = await Company.find({
      name: { $regex: `${companyName}` },
    });

    return res.status(200).json({ sucess: true, companies });
  },

  async getCompaniesByLocation(req, res) {
    const { latitude, longitude } = req.query;

    const companies = await Company.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.status(200).json({ sucess: true, companies });
  },
};
