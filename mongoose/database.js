import mongoose from 'mongoose';
const MONGOOSE_URL = process.env.MONGOOSE_URL_LOCAL

const database = () => {
  try {
    if (MONGOOSE_URL) return mongoose.connect(MONGOOSE_URL)

    throw new Error()
  } catch (error) {
    mongoose.connection.close(() => {
      console.log("BD closed.")
    })

    return undefined
  }
}

export default database