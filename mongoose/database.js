import mongoose from 'mongoose';
const MONGOOSE_URL = process.env.MONGOOSE_URL_LOCAL

const database = async () => {
  if (MONGOOSE_URL) {
    try {
      return await mongoose.connect(MONGOOSE_URL)
    } catch (error) {
      mongoose.connection.close(() => console.log("BD closed."))
    }
  }

  return undefined 
}

export default database