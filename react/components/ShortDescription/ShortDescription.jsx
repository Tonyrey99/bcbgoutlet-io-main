import React from "react"
import { useProduct } from 'vtex.product-context'
import styles from './style.css'

const ShortDescription = () => {

  const productContextValue = useProduct()
  //console.log("productContextValue --> ", productContextValue)

  const [shortDescription, setShortDescription] = React.useState('')

  const getProduct = async () => {
    const productId = productContextValue.product.productId
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
    getProduct()
  }, [])

  return (
    <>
      <div className={`${styles.wrapperShortDescription} flex`}>
        <p className={`${styles.paragraphShortDescription} flex`}>
          {shortDescription}
        </p>
      </div>
    </>
  )

}

export default ShortDescription;
