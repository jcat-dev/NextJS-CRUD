import { Schema, model, models } from "mongoose"

const text = "is required"

const planSchema = Schema({
  title: {
    type: String,
    required: [true, `Title ${text}`]
  },
  text: {
    type: String,
    required: [true, `Text ${text}`]
  }
})

export default models.Plan || model("Plan", planSchema)

