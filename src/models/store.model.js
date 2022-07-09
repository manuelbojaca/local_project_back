const { Schema, model, models } = require("mongoose");

const storeSchema = new Schema(
  {
    businessId: {
      type: { type: Schema.Types.ObjectId, ref: "Business" },
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      required: false,
    },
  },
  { timestamps: true }
);

const Store = model("Store", storeSchema);
module.exports = Store;
