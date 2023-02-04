import styles from "@/src/styles/module/erros/InternalServerError.module.css"

const InternalServerError: React.FC = () => {
  return (
    <div className={styles.container} >
      <p className={styles.error} >500</p>
      <p className={styles.title} >Internal Server Error</p>
      <p className={styles.text} >
        The server encountered an internal error and was unable to 
        complete your request. Please try again later.
      </p>
    </div>
  )
}

export default InternalServerError