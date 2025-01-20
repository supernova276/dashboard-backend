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

export const getTransactions=async(req,res)=>{
  try{

    const {page=1, pageSize=20,sort=null, search=" "}=req.params

    const generateSort = () => {

      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort === "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip((page-1) * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },    //this i makes the search case sensitive
    });

    res.status(200).json({
      transactions,
      total,
    });

  }
  catch(error){
    return res.status(500).send({messagae: "Error fetching product"})
  }
}