import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_TOKEN } from '../../configs/auth.config.js';
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import ProductStat from "../models/productStats.model.js";
import Transaction from "../models/transactions.model.js";
import OverallStat from "../models/overallStats.model.js";
export const userSignup=async(req,res)=>{

    const {name,password,email,city,state,country,occupation,phoneNumber}=req.body

    try{
        const hashedPassword= await bcrypt.hashSync(password,10)

        const newUser=new User({
        name,
        password:hashedPassword,
        email,
        city,
        state,
        country,
        occupation,
        phoneNumber
    })
    const user=await newUser.save()
    return res.status(201).send(user)
}
catch(err){
    res.status(500).send({message:err.message})
}
}

export const userLogin=async(req,res)=>{

    
    const{email,password}=req.body
    
    const user=await User.findOne({email:email})

    if(!user)return res.status(401).send({message:"incorrect email"})

    try{
        const isValidPassword= await bcrypt.compareSync(password,user.password)

        console.log("validdddddd",isValidPassword)

        if(!isValidPassword){
            return res.status(401).send({message:"the password is invalid"})
        }

        console.log("secrettttt",SECRET_TOKEN)

        var token=jwt.sign({name:user.name},process.env.SECRET_TOKEN,{expiresIn:'24h'})

        return res.status(200).send({
           name:user.name,
           email:user. email,
           state:user. state,
           country:user. country,
           occupation:user. occupation,
           city:user. city,
           phoneNumber:user. phoneNumber,
           transactions:user. transactions,
           accesstoken:token
        })

}
catch(err){
    console.log("errorrrr",err)
}
}

export const addProduct=async(req,res)=>{
    try{const {name,price,description,category,rating,supply}=req.body
    const newProduct=new Product({
        name,
        price,
        description,
        category,
        rating,
        supply
    })
    await newProduct.save()
    return res.status(200).send({message:"product added successfully"})}
    catch(error){
        if (error.code === 11000) {
            console.error('Duplicate product name:', error.keyValue.name);
          } else {
            console.error('Error saving product:', error);
          }
    }

}

export const delProduct=async(req,res)=>{
    try{
    const {slug}=req.params
    const product= await Product.findOne({slug})

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.deleteOne();
      return res.status(200).json({ message: `Product '${product.name}' deleted successfully!` });

    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

}

export const addProductStats = async (req, res) => {
    try {
      const {
        productId,
        yearlySalesTotal,
        yearlyTotalSoldUnits,
        year,
        monthlyData,
        dailyData,
      } = req.body;
  
      // Check if the productId exists in the Product collection
      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(404).json({
          message: "Product with the given ID does not exist.",
        });
      }
  
      // Create a new ProductStat document
      const newProductStat = new ProductStat({
        productId,
        yearlySalesTotal,
        yearlyTotalSoldUnits,
        year,
        monthlyData,
        dailyData,
      });
  
      // Save to database
      const savedProductStat = await newProductStat.save();
  
      res.status(201).json({
        message: "Product statistics added successfully!",
        data: savedProductStat,
      });
    } catch (error) {
      console.error("Error adding product stats:", error);
      res.status(500).json({ message: "Error adding product stats", error });
    }
  };

export const createTransactions=async(req,res)=>{
 try{ const {userId,cost,products}=req.body
  const newTransaction=new Transaction({
    userId,
    cost,
    products
  })
  console.log("newwwwww",newTransaction)
  await newTransaction.save()
  return res.status(201).send({'msg':"txn created successfuly"})
}
catch(error){
  console.log("error",error)
  res.status(500).json({message:"Error adding txn",error})
}
}

export const createOverallStat = async (req, res) => {
  try {
    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      year,
      monthlyData,
      dailyData,
      salesByCategory,
    } = req.body;

    const newOverallStat = new OverallStat({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      year,
      monthlyData,
      dailyData,
      salesByCategory,
    });

    await newOverallStat.save();

    return res.status(201).json({ msg: "Overall stats created successfully" });
  } catch (error) {
    console.error("Error creating overall stats:", error);
    return res
      .status(500)
      .json({ message: "Error adding overall stats", error });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });
    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};