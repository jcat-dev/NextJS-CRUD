import { Field } from "formik"

interface Props {
  name: string
  error: boolean
  touched: boolean
  fieldWidth: "w-45" | "w-90"
  active: boolean
  children: React.ReactNode
  textFormat?: "capitalize" | "uppercase" | "lowercase"
}

const Select: React.FC<Props> = (props) => {
  return (  
    <div className={`form__field ${props.fieldWidth}`} >      
      <Field 
        className={
          (props.error && props.touched) 
          ? "form__select form__select--error"
          : "form__select"
        }
        name={props.name} 
        as="select" 
      >
        {
          props.children
        }
      </Field>

      <label className="form__label form__label--active" >
        {props.name[0].toUpperCase().concat(props.name.slice(1))}
      </label>
    </div>
  )
}

export default Select