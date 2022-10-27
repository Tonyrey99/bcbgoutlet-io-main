import React from "react"
import styles from '../styles.css'

const ShortDescription = (props) => {

  const [shortDescription, setShortDescription] = React.useState('')

  const getProduct = async (productId) => {
    try {
      const url = `/api/catalog/pvt/product/${productId}`
      let request = await fetch(url)
      let data = await request.json()

      setShortDescription(data.DescriptionShort)

    } catch (error) {
      console.log("ERROR TO GET PRODUCT --> ",error)
    }
  }

  React.useEffect(() => {
    getProduct(props.id)
  }, [])

  return (
    <>
      <p className={styles.listItem__shortDescription}>
        {shortDescription}
      </p>
    </>
  )

}

export default ShortDescription;
