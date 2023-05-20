const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema(
  {
    owner_email: {
        type: String,
        //required: true
      },
      sender_email: {
        type: String,
        //required: true
      },
    objectid:{type: String},
    return_date:{type: Date},
    rent_price:{type:Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("rented", rentSchema);