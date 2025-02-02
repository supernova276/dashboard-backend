import Product from "../models/product.model.js";
import ProductStat from "../models/productStats.model.js";
import Transaction from "../models/transactions.model.js";
import User from "../models/user.model.js"

export const getProduct=async(req,res)=>{
    try{
        const products= await Product.find()
        
        res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        message: "Error fetching products",
        error,
      });
    }
}


export const getProductStats=async(req,res)=>{

    try {
        const { productId } = req.params; // Assuming productId is passed as a route parameter
    
        // Fetch the product stats for the given productId and populate the product details
        const productStats = await ProductStat.find({ productId }).populate("productId");
    
        if (!productStats || productStats.length === 0) {
          return res.status(404).json({ message: "No product stats found for the given product ID." });
        }
    
        res.status(200).json({
          message: "Product stats retrieved successfully!",
          data: productStats,
        });
      } catch (error) {
        console.error("Error fetching product stats:", error);
        res.status(500).json({ message: "Error fetching product stats", error });
      }

}

export const getCustomers=async(req,res)=>{
      try{
        const users=await User.find({role:'user'}).select('-password')
        return res.status(200).send(users)
      }
      catch(error){
        return res.status(500).send({
          message:"Error fetching product",error
        })
      }
}

export const getTransactions = async (req, res) => {
  try {
    // Extract query parameters with default values
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // Ensure `page` and `pageSize` are positive integers
    const pageNumber = Math.max(1, parseInt(page, 10)); // Default to 1 if invalid
    const pageSizeNumber = Math.max(1, parseInt(pageSize, 10)); // Default to 1 if invalid

    // Generate sorting object if `sort` parameter is provided
    const generateSort = () => {
      try {
        const sortParsed = JSON.parse(sort);
        return { [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1 };
      } catch (error) {
        console.error("Error parsing sort parameter:", error);
        return {}; // Default to no sorting if parsing fails
      }
    };

    const sortFormatted = sort ? generateSort() : {};

    // Build the search query
    const searchQuery = {
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    };

    // Fetch transactions with pagination and sorting
    const transactions = await Transaction.find(searchQuery)
      .sort(sortFormatted)
      .skip((pageNumber - 1) * pageSizeNumber)
      .limit(pageSizeNumber);

    // Count total documents matching the search query
    const total = await Transaction.countDocuments(searchQuery);

    // Respond with paginated results and total count
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    console.error("Error in getTransactions:", error);
    res.status(500).json({
      message: "Error fetching transactions",
      error: error.message || "Unknown error",
    });
  }
};
