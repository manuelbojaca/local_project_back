const { Schema, model, models } = require("mongoose");

const businessSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    promotions: {
      type: String,
      required: false,
    },
    stores: {
      type: [{ type: Schema.Types.ObjectId, ref: "Store" }],
      require: false,
    },
  },
  { timestamps: true }
);

const Business = model("Bussiness", businessSchema);
module.exports = Business;
