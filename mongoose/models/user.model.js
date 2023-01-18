import { Schema, model, models } from "mongoose"
import studentModel from "./student.model"
import adminModel from "./admin.model"

const text = "is required"

const userSchema = new Schema({
  role: {
    type: String,
    required: [true, `Role ${text}`]
  },
  password: {
    type: String,
    required: [true, `Password ${text}`]
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: adminModel
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: studentModel
  },
  email: {
    type: String,
    required: [true, `Email ${text}`],
    unique: true,
  },
})

export default models.User || model("User", userSchema)