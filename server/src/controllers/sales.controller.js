
import OverallStat from '../models/overallStats.model.js'

export const getOverallStats = async (req, res) => {
    console.log("jelloooo")
    try {
      const stats = await OverallStat.find();
      return res.status(200).json(stats[0]);
    } catch (error) {
      console.error("Error fetching overall stats:", error);
      return res
        .status(500)
        .json({ message: "Error fetching overall stats", error });
    }
  };