import React from "react"
import { useProduct } from 'vtex.product-context'
import styles from './style.css'

const SoldAndDelivered = () => {

  const productContextValue = useProduct()

  //console.log("productContextValue --> ", productContextValue)

  return (
    <>
      <div className={`${styles.wrapperSeller}`}>

        <p className={`${styles.paragraphSeller} flex`}>
          <span className={`${styles.iconSeller}`}></span>
          Vendido e entregado por: <a className={`${styles.sellerLink}`} href={`/${productContextValue?.selectedItem?.sellers[0].sellerId}`}><span className={`${styles.highlightSeller} target="_blank"`}>{productContextValue?.selectedItem?.sellers[0].sellerName}</span></a>
        </p>

      </div>

    </>
  )

}

export default SoldAndDelivered;
