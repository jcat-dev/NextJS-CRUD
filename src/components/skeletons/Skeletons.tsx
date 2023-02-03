
interface Props {
  numberContainers: number
  numberItems: number
  containerClassName: string
  itemClassName: string

  /**
   * Se pondrá el segundo elemento, si la condición se cumple.
   * 
   * secondItems <= index del numberItems
   */
  secondItem?: number 
  secondItemClassname?: string
}

const Skeletons: React.FC<Props> = (props: Props) => {
  const containers = Array(props.numberContainers).fill("")    
  const items = Array(props.numberItems).fill("")
 
  return (
    <>
      {
        containers.map((value, index) => 
          <ul
            key={index}
            className={props.containerClassName}
          >
            {
              items.map((__, index) =>                
                <li
                  key={index}
                  className={
                    ( props.secondItem || 0 ) <= index 
                    ? props.secondItemClassname  
                    : props.itemClassName           
                  }
                />                
              )
            }
          </ul>
        )              
      }
    </>
  )
}

export default Skeletons