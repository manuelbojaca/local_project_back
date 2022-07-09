const { Schema, model, models } = require("mongoose");

const productSchema = new Schema(
  {
    storeId: {
      type: [{ type: Schema.Types.ObjectId, ref: "Store" }],
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
module.exports = Product;
