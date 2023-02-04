import styles from "@/src/styles/module/erros/Unauthorized.module.css"

const Unauthorized: React.FC = () => {
  return (
    <main className={styles.container} >
      <p className={styles.error} >401</p>
      <p className={styles.title} >Unauthorized</p>
      <p className={styles.text} >
        You need to provide valid credentials to access this resource.
        <a
          className={styles.link}
          href="/"
        > 
          Log in
        </a>
      </p>
    </main>
  )
}

export default Unauthorized