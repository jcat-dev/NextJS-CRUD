import Skeletons from "./Skeletons"
import styles from "@/src/styles/module/skeletons/PlanIDSkeleton.module.css"

const PlanIDSkeleton: React.FC = () => {
  return (
    <Skeletons 
      numberContainers={1}
      numberItems={2}
      containerClassName={styles.container}
      itemClassName={styles.item}
      secondItem={1}
      secondItemClassname={styles.secondItem}
    />
  )
}

export default PlanIDSkeleton