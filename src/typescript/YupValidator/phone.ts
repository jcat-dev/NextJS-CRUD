import * as Yup from "yup"

const phone = Yup.string()
  .matches(/^\+?[0-9]{2,4}-[0-9]{1,5}-[0-9]{4,}$/)
  .required()

export default phone