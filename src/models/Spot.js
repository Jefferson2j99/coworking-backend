const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  image: String,
  price: String,
  name: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  }
});

module.exports = mongoose.model("Spot", SpotSchema);
