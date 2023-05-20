const mongoose = require("mongoose");

const exchangerequest = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    owner_email: {
        type: String,
        //required: true
      },
      sender_email: {
        type: String,
        //required: true
      },
    objectid:{type: String},
    return_date:{type: Date}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("exchangerequest", exchangerequest);