import { Field } from "formik"

interface Props {
  name: string
  type: string
  value: string
  fieldWidth: "w-45" | "w-90"
  active: boolean
  textFormat?: "capitalize" | "uppercase" | "lowercase"
  error: boolean
  touched: boolean
  autoComplete?: "off"
  disabled?: boolean
  children?: React.ReactNode
}

const Input: React.FC<Props> = (props) => {
  return (
    <div className={`form__field ${props.fieldWidth}`} >
      <Field                 
        className={
          (props.error && props.touched) 
          ? "form__input form__input--error " + props.textFormat
          : "form__input " + props.textFormat
        }
        name={props.name} 
        type={props.type} 
        autoComplete={props.autoComplete}
        disabled={props.disabled}
      />

      <label 
        className={
          (props.value)
          ? (props.error)
            ? "form__label form__label--active form__label--error"
            : "form__label form__label--active form__label--success"
          : (props.active)
            ? "form__label form__label--active"
            : "form__label"                                     
        } 
      >
        {
          props.name[0].toUpperCase().concat(props.name.slice(1).toLowerCase())
        }
      </label>   

      {
        props.children
      }
    </div>
  )
}

export default Input