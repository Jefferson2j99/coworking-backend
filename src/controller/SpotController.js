const Company = require("../models/Company");
const Spot = require("../models/Spot");

module.exports = {
  async createSpot(req, res) {
    const { image, price, name, company_id } = req.body;

    const company = await Company.findById(company_id);

    if (!company) {
      return res.status(400).json({ success: false, message: "Empresa não existe!" });
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

    return res.status(200).json({ success: true, message: "Local salvo com sucesso!" });
  },

  async findSpotsByCompanyId(req, res) {
    const { companyId } = req.params;

    const spots = await Spot.find({ company: companyId });

    if (!spots) {
      return res.status(400).json({
        succes: false,
        spots: []
      });
    }

    return res.status(200).json({
      success: true,
      spots
    });
  }
};
