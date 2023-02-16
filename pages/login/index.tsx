import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { toast, ToastContainer } from "react-toastify"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import * as Yup from "yup"
import styles from "@/src/styles/module/Login.module.css"
import "react-toastify/dist/ReactToastify.css"

interface FormValues {
  email: string
  password: string
}

const Login: React.FC = () => {
  const router = useRouter()
     
  const initialValues: FormValues = {
    email: "",
    password: ""
  }

  const validationSchema = {
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
  }

  const handleSubmit = async (values: FormValues) => {
    const data = await signIn('credentials', { 
      redirect: false, 
      email: values.email,
      password: values.password        
    })

    if(data?.ok) {
      return router.push("/dashboard")
    }
    
    return toast.error("The Email/Password is wrong", { position: "bottom-right" })
  }

  const handleFields = (isValid: boolean, dirty: boolean) => {
    if (!isValid || !dirty) return toast.error("Required Fields", {position: "bottom-right"})
  }

  return (
    <main className={styles.container} >
      <Formik 
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched, isValid, dirty, values }) => 
          <Form className={styles["form-container"]} >
            <span className={styles.title} >
              LOG IN
            </span>

            <div className={styles.helper} >
              ?

              <p className={styles["helper-text"]} >
                  try admin@gmail.com/admin              
              </p>
            </div>

            <div 
              className={styles.field}
            >
              <Field 
                className={
                  (errors.email && touched.email) 
                  ? `${styles.input} ${styles["input--error"]} ${styles["input--bg-error"]}`
                  : `${styles.input}`
                }
                name="email"
                type="email"
                autoComplete="off"
              />

              <label 
                className={
                  (values.email)
                  ? (errors.email)
                    ? `${styles.label} ${styles["label--active"]} ${styles["label--error"]}` 
                    : `${styles.label} ${styles["label--active"]} ${styles["label--success"]}` 
                  : styles.label 
                } 

                htmlFor="email"
              >
                Your Email
              </label>
            </div>       

            <div
              className={styles.field}
            > 
              <Field 
                className={
                  (errors.password && touched.password) 
                  ? `${styles.input} ${styles["input--error"]} ${styles["input--bg-error"]}` 
                  : `${styles.input}`
                }
                name="password"  
                type="password"              
              />

              <label 
                className={
                  (values.password)
                  ? (errors.password)
                    ? `${styles.label} ${styles["label--active"]} ${styles["label--error"]}` 
                    : `${styles.label} ${styles["label--active"]} ${styles["label--success"]}` 
                  : styles.label 
                }

                htmlFor="password"
              >
                Your password
              </label>
            </div>
            
            <Link
              href="/login/recovery-password"
              className={styles["recovery-password"]}
            >
              Forgot <b>Password?</b>
            </Link>
                  
            <button 
              className={styles["btn-submit"]}
              type="submit"
              onClick={() => handleFields(isValid, dirty)}
            >
              LOG IN
            </button>
          </Form>
        }
      </Formik>

      <ToastContainer />
    </main>
  );
}

export default Login