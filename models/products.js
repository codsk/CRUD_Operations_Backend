let mongoose = require("mongoose");
let ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please enter product name"],
    },
    quantity: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    image: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);
let Product = mongoose.model("Product", ProductSchema);
module.exports=Product;
