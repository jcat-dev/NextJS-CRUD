import mongoose from 'mongoose';

const database = () => {
  try {
    return mongoose.connect(process.env.MONGOOSE_URL_LOCAL)
  } catch (error) {
    mongoose.connection.close(() => {
      console.log("BD closed.")
    })
  }
}

export default database