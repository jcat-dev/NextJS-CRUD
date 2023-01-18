import { Schema, model, models } from "mongoose"
import planModel from "./plan.model"

const text = "is required"

const studentSchema = Schema({
  name: {
    type: String,
    required: [true, `Name ${text}`]
  },
  surname: {
    type: String,
    required: [true, `Surname ${text}`]
  },
  birthday: {
    type: Date,
    required: [true, `Birthday ${text}`]
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: planModel,
    required: [true, `Plan ${text}`]
  },
  dni: {
    type: String,
    required: [true, `DNI ${text}`],
    unique: true
  },
  phone: {
    type: String,
    required: [true, `Phone ${text}`],
    unique: true
  },
  email: {
    type: String,
    required: [true, `Email ${text}`],
    unique: true
  },
})

export default models.Student || model("Student", studentSchema)