import React, {useState, useEffect} from "react"
import { useProduct } from 'vtex.product-context'
import styles from './style.css'

const DiscountPhrase = () => {

  const productContextValue = useProduct()

  console.log("productContextValue --> ", productContextValue)

  const [listPrice, setListPrice] = useState(productContextValue.selectedItem.sellers[0].commertialOffer.ListPrice)
  const [sellingPrice, setSellingPrice] = useState(productContextValue.selectedItem.sellers[0].commertialOffer.Price)

  useEffect(()=>{

    setListPrice(productContextValue.selectedItem.sellers[0].commertialOffer.ListPrice)
    setSellingPrice(productContextValue.selectedItem.sellers[0].commertialOffer.Price)

    console.log(`listPrice --> ${listPrice} | sellingPrice --> ${sellingPrice}`)

  }, [])

  return (
    <>
      <div className={`${styles.wrapper}`}>
        {
          sellingPrice < listPrice && (
            <p className={styles.paragraph}>
              <span className={styles.asterisco}>*</span> En mercancia con descuento no se aceptan cambios ni devoluciones.
            </p>
          )
        }
      </div>
    </>
  )

}

export default DiscountPhrase;
