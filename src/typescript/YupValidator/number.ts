import * as Yup from "yup"

const number = Yup.number()
  .integer()
  .positive()
  .min(10000000)
  .required(" ")

export default number