import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
  {
    productId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference another model
    ref: "Product",                      // Reference the Product model
    required: true,  
    },
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;