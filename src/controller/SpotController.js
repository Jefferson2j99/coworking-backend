const Company = require('../models/Company');
const Spot = require('../models/Spot');

module.exports = {
  async store(req, res) {
    const { image, price, name, company_id } = req.body;

    const company = Company.findById(company_id);

    if (!company) {
      return res.json({ success: false, message: 'Empresa não existe!' });
    }

    const spot = await Spot.create({
      image,
      price,
      name,
      company: company_id
    });

    await spot.populate('company').execPopulate();

    return res.json(spot);
  }
}