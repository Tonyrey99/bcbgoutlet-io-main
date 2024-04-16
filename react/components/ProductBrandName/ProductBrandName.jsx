import React from "react"
import { useProduct } from 'vtex.product-context'
import styles from './style.css'

const ProductBrandName = () => {

  const productContextValue = useProduct()

  //console.log("productContextValue --> ", productContextValue)

  return (
    <>
      <div className={`${styles.wrapperBrand}`}>
        <p className={`${styles.paragraphBrand} flex`}>
          <span className={`${styles.iconBrand}`}></span>
          <span className={`${styles.highlightBrand}`}><b className={`${styles.titleBrand}`}>Marca:</b> {productContextValue?.product?.brand}</span>
        </p>
      </div>
    </>
  )
}

export default ProductBrandName;
