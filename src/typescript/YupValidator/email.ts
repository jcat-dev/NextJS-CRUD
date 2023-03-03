import * as Yup from "yup"

const email = Yup.string()
  .email()
  .required()
  
export default email