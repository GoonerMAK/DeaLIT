const mongoose = require("mongoose");

const rentrequestSchema = new mongoose.Schema(
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
    return_date:{type: Date}
  },
  { timestamps: true }
);

module.exports = mongoose.model("rentrequests", rentrequestSchema);