const Company = require("../models/Company");
const Spot = require("../models/Spot");

module.exports = {
  async createSpot(req, res) {
    const { image, price, name, company_id } = req.body;

    const company = await Company.findById(company_id);

    if (!company) {
      return res.json({ success: false, message: "Empresa não existe!" });
    }

    const spot = await Spot.create({
      image,
      price,
      name,
      company: company_id
    });

    await Company.updateOne(
      {
        _id: company._id
      },
      {
        $push: { spots: spot._id }
      }
    );

    return res.json({ success: true, message: "Local salvo com sucesso!" });
  }
};
