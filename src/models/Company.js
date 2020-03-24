const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const CompanySchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  name: {
    type: String,
    unique: true
  },
  linkedin: String,
  logo: String,
  techs: [String],
  street: String,
  number: String,
  complement: String,
  phone: String,
  location: {
    type: PointSchema,
    index: "2dsphere"
  },
  spots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spot"
    }
  ]
});

module.exports = mongoose.model("Company", CompanySchema);
