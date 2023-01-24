import { Schema, model, models } from "mongoose"

const text = "is required"

const adminSchema = Schema({
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
  email: {
    type: String,
    required: [true, `Email ${text}`],
    unique: true
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
})

export default models.Admin || model("Admin", adminSchema)